package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class userDataService {

    @Autowired
    userDataRepo dao;

    @Autowired
    transactionService tservice;

    @Autowired
    userDataRepo repo;

    @Autowired
    private Cloudinary cloudinary;

    public void createUserData(User user) {
        UserData userData = new UserData();
        userData.setUser(user);
        userData.setDisplayName("Edit Display Name");
        dao.save(userData);
    }

    public UserData findUser(String userID) {
        return dao.findById(userID).orElse(null);
    }

    //profile picture,display name,
    public Map<String, String> getBasicData(String userID) {
        Map<String, String> basicUserData = new HashMap<>();
        UserData fetchedUser = findUser(userID);
        basicUserData.put("profilePicture",
                fetchedUser.getProfilePicture());

        basicUserData.put("displayName",
                fetchedUser.getDisplayName());
        return basicUserData;
    }

    public String setProfilePic(String userID,MultipartFile file) throws IOException {
        UserData fetchedUser = findUser(userID);
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String imageUrl = (String) uploadResult.get("secure_url");
        fetchedUser.setProfilePicture(imageUrl);
        dao.save(fetchedUser);
        return imageUrl;
    }

    public String displayName(String userID, Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        fetchedUser.setDisplayName(body.get("displayName"));
        return dao.save(fetchedUser).getDisplayName();
    }

    public String work(String userID, Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        fetchedUser.setWork(body.get("work"));
        return dao.save(fetchedUser).getWork();
    }

    public UserData addTransaction(String userID, Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        Transaction t = tservice.createTransaction(body);
        switch (t.getType()) {
            case "UPI" -> {
                fetchedUser.setUpiTransaction(fetchedUser.getUpiTransaction() + t.getAmount());
                fetchedUser.setTransactionHistory(t);
            }
            case "Cash" -> {
                fetchedUser.setCashTransaction(fetchedUser.getCashTransaction() + t.getAmount());
                fetchedUser.setTransactionHistory(t);
            }
            case "Card" -> {
                fetchedUser.setCardTransaction(fetchedUser.getCardTransaction() + t.getAmount());
                fetchedUser.setTransactionHistory(t);
            }
            case null, default -> {
                return null;
            }
        }
        fetchedUser.setExpense(t.getExpenseType(), t.getAmount());
        fetchedUser.setTotalExpense(fetchedUser.getCardTransaction() + fetchedUser.getCashTransaction() + fetchedUser.getUpiTransaction());
        return dao.save(fetchedUser);
    }

    public List<Transaction> updateTransaction(String userID,Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        List<Transaction> transactionHistory = fetchedUser.getTransactionHistory();
        deleteTransaction(userID,body);
        addTransaction(userID,body);
        return transactionHistory;
    }
    public List<Transaction> deleteTransaction(String userID,Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        List<Transaction> transactionHistory = fetchedUser.getTransactionHistory();
        for (Transaction transaction : transactionHistory) {
            if (transaction.getTransactionID().equals(body.get("transactionID"))) {
                fetchedUser.setTransactionHistory(transactionHistory);

                switch (transaction.getType()) {
                    case "UPI" -> fetchedUser.setUpiTransaction(fetchedUser.getUpiTransaction() - transaction.getAmount());
                    case "Card" -> fetchedUser.setCardTransaction(fetchedUser.getCardTransaction() - transaction.getAmount());
                    case "Cash" -> fetchedUser.setCashTransaction(fetchedUser.getCashTransaction() - transaction.getAmount());
                    default -> {return null;}
                }

                if (fetchedUser.getExpense().containsKey(transaction.getExpenseType())){
                    fetchedUser.getExpense().put(transaction.getExpenseType(), fetchedUser.getExpense().get(transaction.getExpenseType()) - transaction.getAmount());
                }
                fetchedUser.setTotalExpense(fetchedUser.getCardTransaction() + fetchedUser.getCashTransaction() + fetchedUser.getUpiTransaction());
                transactionHistory.remove(transaction);
                repo.save(fetchedUser);
                break;
            }
        }
        return transactionHistory;
    }
}
