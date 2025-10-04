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

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
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

    @GetMapping("/transaction")
    public List<Transaction> transaction(HttpServletRequest request){
        String userID = getUserId(request);
        return dataService.findUser(userID).getTransactionHistory();
    }
}
