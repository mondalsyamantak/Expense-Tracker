package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userDataService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class userDataController {

    @Autowired
    userDataService service;

    @Autowired
    JwtService jwtService;


    //Very important code
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


    //amount
    //type - card,cash,upi
    //description -
    //expenseType - food,travel, ...
    @PostMapping("/transaction")
    public UserData transaction(HttpServletRequest request, @RequestBody Map<String, String> body){
        String userID = getUserId(request);
        return service.addTransaction(userID,body);

    }

    @PostMapping("/setProfilePic")
    public String setProfilePic(HttpServletRequest request,@RequestParam("file") MultipartFile file) throws IOException {
        String userID = getUserId(request);
        return service.setProfilePic(userID,file);
    }

}
