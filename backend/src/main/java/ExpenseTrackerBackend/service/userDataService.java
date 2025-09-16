package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class userDataService {

    @Autowired
    userDataRepo dao;

    @Autowired
    transactionService tservice;

    //profile picture,display name,
    public Map<String, String> getBasicData(String userID) {
        UserData userDataOpt = dao.findByid(userID);
        Map<String, String> basicUserData = new HashMap<>();

        basicUserData.put("profilePicture",
                userDataOpt.getProfilePicture());

        basicUserData.put("displayName",
                userDataOpt.getDisplayName());
        return basicUserData;
    }

    public String displayName(String userID,Map<String, String> body){
        UserData fetchedUser = dao.findByid(userID);
        fetchedUser.setDisplayName(body.get("displayName"));
        return dao.save(fetchedUser).getDisplayName();
    }

    public String work(String userID, Map<String, String> body) {
        UserData fetchedUser = dao.findByid(userID);
        fetchedUser.setWork(body.get("work"));
        return dao.save(fetchedUser).getWork();
    }

    public UserData addTransaction(String userID,Map<String, String> body){
        UserData fetchedUser = dao.findByid(userID);
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
        switch (t.getExpenseType()){
            case "food" -> fetchedUser.setFoodExpense(t.getAmount() + fetchedUser.getFoodExpense());
            case "travel" -> fetchedUser.setTravelExpense(t.getAmount() + fetchedUser.getTravelExpense());
            case "miscellaneous" -> fetchedUser.setMiscellaneousExpense(t.getAmount() + fetchedUser.getMiscellaneousExpense());
            case null, default -> {
                return null;
            }
        }
        return dao.save(fetchedUser);
    }
}
