package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.IncomeSource;
import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class userDataService {

    @Autowired
    userDataRepo dao;

    @Autowired
    transactionService tservice;

    @Autowired
    incomeService inService;

    @Autowired
    private Cloudinary cloudinary;

    public void createUserData(User user) {
        UserData userData = new UserData();
        userData.setUser(user);
        userData.setDisplayName("Edit Display Name");
        dao.save(userData);
    }

    private UserData updateUserData(UserData fetchedUser){
        Map<String, IncomeSource> fetchedIncomeSource = fetchedUser.getIncomeSources();
        LocalDate today = LocalDate.now();

        for (IncomeSource value : fetchedIncomeSource.values()) {

            LocalDate incomeDate = value.getUpdateDate(); // last time it was updated
            long diff = switch (value.getRecurringType()) {
                case "Daily" -> ChronoUnit.DAYS.between(incomeDate, today);
                case "Monthly" -> ChronoUnit.MONTHS.between(incomeDate, today);
                case "Yearly" -> ChronoUnit.YEARS.between(incomeDate, today);
                default -> 0;
            };

            if (diff > 1) {
                long newAmount = value.getAmount() + (diff * value.getAmount());
                value.setAmount((int) newAmount);
                value.setUpdateDate(today); // update date so it doesn’t multiply again next time
            }
        }
        return fetchedUser;
    }


    public UserData findUser(String userID) {
        System.out.println("🚀 DB CALLED : " + userID);
        UserData fetchedUser = dao.findById(userID).orElse(null);
        UserData finalFU = null;
        try {
            assert fetchedUser != null;
            finalFU = dao.save(updateUserData(fetchedUser));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return finalFU;
    }

    //profile picture,display name
    public Map<String, String> getBasicData(String userID) {
        Map<String, String> basicUserData = new HashMap<>();
        UserData fetchedUser = findUser(userID);
        basicUserData.put("profilePicture",
                fetchedUser.getProfilePicture());

        basicUserData.put("displayName",
                fetchedUser.getDisplayName());
        return basicUserData;
    }

    public String setProfilePic(String userID, MultipartFile file) throws IOException {
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
                fetchedUser.addTransactionHistory(t);
            }
            case "Cash" -> {
                fetchedUser.setCashTransaction(fetchedUser.getCashTransaction() + t.getAmount());
                fetchedUser.addTransactionHistory(t);
            }
            case "Card" -> {
                fetchedUser.setCardTransaction(fetchedUser.getCardTransaction() + t.getAmount());
                fetchedUser.addTransactionHistory(t);
            }
            case null, default -> {
                return null;
            }
        }
        fetchedUser.setExpense(t.getExpenseType(), t.getAmount());
        fetchedUser.setTotalExpense(fetchedUser.getCardTransaction() + fetchedUser.getCashTransaction() + fetchedUser.getUpiTransaction());
        return dao.save(fetchedUser);
    }

    public List<Transaction> updateTransaction(String userID, Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        List<Transaction> transactionHistory = fetchedUser.getTransactionHistory();
        deleteTransaction(userID, body);
        addTransaction(userID, body);
        return transactionHistory;
    }

    public List<Transaction> deleteTransaction(String userID, Map<String, String> body) {
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
                dao.save(fetchedUser);
                break;
            }
        }
        return transactionHistory;
    }

    // adds income source to the userData
    public IncomeSource createIncomeSource(String userID, Map<String, String> body) {
        IncomeSource incomeSource = inService.createIncomeSource(body);
        UserData fetchedUser = findUser(userID);
        fetchedUser.setIncome(fetchedUser.getIncome() +  incomeSource.getAmount());
        fetchedUser.setIncomeSource(incomeSource);
        fetchedUser.setIncome(fetchedUser.getIncome() +  incomeSource.getAmount());
        dao.save(fetchedUser);
        return incomeSource;
    }

    public IncomeSource deleteIncomeSource(String userID, Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        IncomeSource incomeSource = fetchedUser.getIncomeSources().remove(body
                .get("incomeSourceID"));
        fetchedUser.setIncome(fetchedUser.getIncome() - incomeSource.getAmount());
        dao.save(fetchedUser);
        return incomeSource;
    }

    public Map<String,IncomeSource> updateIncomeSource(String userID, Map<String, String> body) {
        UserData fetchedUser = findUser(userID);
        IncomeSource incomeSource = fetchedUser.getIncomeSources().remove(body
                .get("incomeSourceID"));
        fetchedUser.setIncome(fetchedUser.getIncome() - incomeSource.getAmount());
        incomeSource.setIncomeName(body.get("incomeName"));
        incomeSource.setDescription(body.get("incomeDescription"));
        incomeSource.setAmount(Integer.parseInt(body.get("amount")));
        incomeSource.setRecurringType(body.get("recurringType"));
        fetchedUser.getIncomeSources().put(body.get("incomeSourceID"), incomeSource);
        dao.save(fetchedUser);
        return fetchedUser.getIncomeSources();
    }
}
