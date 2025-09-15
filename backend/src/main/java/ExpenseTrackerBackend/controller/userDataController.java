package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class userDataController {

    @Autowired
    userDataService service;
    @Autowired
    JwtService jwtService;

    //For basic data
    @GetMapping("/basicData")
    public Map<String,String> basicData(HttpServletRequest request){
        String userID = jwtService.extractUserId(request.getHeader("Authorization").substring(7));
        return service.getBasicData(userID);
    }

}
