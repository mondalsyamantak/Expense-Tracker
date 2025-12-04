package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")


public class transactionController {

    @Autowired
    JwtService jwtService;

    @Autowired
    userDataService service;

//    @PostMapping("/deleteTransaction")
//    public Transaction deleteTransaction( @RequestBody Map<String, String> body){
//    }

    private String getUserId(HttpServletRequest request){
        return jwtService.extractUserId(request.getHeader("Authorization").substring(7));
    }


    // send the jwt token and in the request body
    //transactionID
    //amount
    //expenseType
    //type
    @PostMapping("/updateTransaction")
    public List<Transaction> updateTransaction(HttpServletRequest request, @RequestBody Map<String, String> body) {
        String userID = getUserId(request);
        return (List<Transaction>) service.updateTransaction(userID,body); // returns the list of transactions
    }

    // send the jwt token and in the request body
    //transactionID
    //amount
    //expenseType
    //type
    @PostMapping("/deleteTransaction")
    public List<Transaction> deleteOneTransaction(HttpServletRequest request, @RequestBody Map<String, String> body) {
        String userID = getUserId(request);
        return (List<Transaction>) service.deleteTransaction(userID,body); // deletes transactions
    }

}
