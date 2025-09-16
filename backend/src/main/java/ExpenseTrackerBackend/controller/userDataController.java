package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class userDataController {

    @Autowired
    userDataService service;

    @Autowired
    JwtService jwtService;

    private String getUserId(HttpServletRequest request){
        return jwtService.extractUserId(request.getHeader("Authorization").substring(7));
    }
    //For basic data
    @GetMapping("/basicData")
    public Map<String,String> basicData(HttpServletRequest request){
        String userID = getUserId(request);
        return service.getBasicData(userID);
    }

    @PostMapping("/DisplayName")
    public String setDisplayName(HttpServletRequest request,
                          @RequestBody Map<String, String> body){
        String userID = getUserId(request);
        return service.displayName(userID,body);
    }
    @PostMapping("/work")
    public String work(HttpServletRequest request,
                                 @RequestBody Map<String, String> body){
        String userID = getUserId(request);
        return service.work(userID,body);
    }

    @PostMapping("/transaction")
    public UserData transaction(HttpServletRequest request, @RequestBody Map<String, String> body){
        String userID = getUserId(request);
        return service.addTransaction(userID,body);

    }

//    @PostMapping("/setProfilePic")
//    public String setProfilePic(@RequestBody ){}

}
