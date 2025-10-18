package ExpenseTrackerBackend.controller;


import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class chartDataController {
    @Autowired
    userDataService dataService;

    @Autowired
    JwtService jwtService;

    private String getUserId(HttpServletRequest request){
        return jwtService.extractUserId(request.getHeader("Authorization").substring(7));
    }

    @GetMapping("/dashboard")
    public UserData dashboard(HttpServletRequest request){
        String userID = getUserId(request);
        UserData fetchedUser = dataService.findUser(userID);
        List<Transaction> EditedTransactionHistory = fetchedUser.getTransactionHistory()
                .stream()
                .sorted(Comparator.comparing(Transaction::getDate).reversed())
                .limit(10)
                .collect(Collectors.toList());
        fetchedUser.getTransactionHistory().clear();
        fetchedUser.getTransactionHistory().addAll(EditedTransactionHistory);
        return fetchedUser;
    }

    @GetMapping("/pieChart")
    public Map<String, Integer> pieChart(HttpServletRequest request) {
        String userID = getUserId(request);
        return dataService.findUser(userID).getExpense();
    }
    @GetMapping("/pieChart2")
    public List<Integer> pieChart2(HttpServletRequest request) {
        String userID = getUserId(request);
        List<Integer> cardCashUpi = new ArrayList<>();
        UserData fetchedUser = dataService.findUser(userID);
        cardCashUpi.add(fetchedUser.getCardTransaction());
        cardCashUpi.add(fetchedUser.getCashTransaction());
        cardCashUpi.add(fetchedUser.getUpiTransaction());
        return cardCashUpi;
    }
    @GetMapping("/totalEnpense")
    public int totalExpense(HttpServletRequest request) {
        String userID = getUserId(request);
        return dataService.findUser(userID).getTotalExpense();
    }

    @GetMapping("/transaction")
    public List<Transaction> transaction(HttpServletRequest request){
        String userID = getUserId(request);
        return dataService.findUser(userID).getTransactionHistory();
    }


}
