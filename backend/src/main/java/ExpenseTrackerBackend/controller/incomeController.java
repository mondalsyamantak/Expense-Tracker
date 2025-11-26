package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.IncomeSource;
import ExpenseTrackerBackend.model.Transaction;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.incomeService;
import ExpenseTrackerBackend.service.userDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class incomeController {

    @Autowired
    JwtService jwtService;

    @Autowired
    incomeService inService;
    @Autowired
    private userDataService service;

    private String getUserId(HttpServletRequest request){
        return jwtService.extractUserId(request.getHeader("Authorization").substring(7));
    }

    @PostMapping("/income")
    public IncomeSource createIncome(HttpServletRequest request, @RequestBody Map<String, String> body) {
        String userID = getUserId(request);
        return service.createIncomeSource(userID,body);
    }

//    @PostMapping("/updateIncomeSource")
//    public List<IncomeSource> updateTransaction(HttpServletRequest request, @RequestBody Map<String, String> body) {
//        String userID = getUserId(request);
//        return service.updateIncomeSource(userID,body); // returns the list of transactions
//    }
//
//    // send the jwt token and in the request body
//    //incomeID
//    //amount
//    //type
//    //etc
//    @PostMapping("/deleteTransaction")
//    public List<IncomeSource> deleteOneIncomeSource(HttpServletRequest request, @RequestBody Map<String, String> body) {
//        String userID = getUserId(request);
//        return service.deleteIncomeSource(userID,body); // deletes transactions
//    }

}
