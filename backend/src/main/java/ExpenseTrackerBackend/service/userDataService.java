package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class userDataService {

    @Autowired
    userDataRepo dao;

    @Autowired
    transactionService tservice;

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
                fetchedUser.setUpiTransaction(t.getAmount());
                fetchedUser.setTransactionHistory(t);
            }
            case "Cash" -> {
                fetchedUser.setCashTransaction(t.getAmount());
                fetchedUser.setTransactionHistory(t);
            }
            case "Card" -> {
                fetchedUser.setCardTransaction(t.getAmount());
                fetchedUser.setTransactionHistory(t);
            }
            case null, default -> {
                return null;
            }
        }
        fetchedUser.setExpense(t.getExpenseType(), t.getAmount());
        return dao.save(fetchedUser);
    }

    public List<Transaction> updateTransaction(String userID,Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        List<Transaction> transactionHistory = fetchedUser.getTransactionHistory();
        for (Transaction transaction : transactionHistory) {
            if (transaction.getTransactionID().equals(body.get("transactionID"))) {
                transaction.setAmount(Integer.parseInt(body.get("amount")));
                transaction.setExpenseType(body.get("expenseType"));
                transaction.setExpenseType(body.get("type"));
                break;
            }
        }
        return transactionHistory;
    }
}
