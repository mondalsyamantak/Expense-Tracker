package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class userController {
    @Autowired
    private userService uService;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/SignUp")
    public String signUp(@RequestBody User user) {
        return uService.createUser(user);
    }

    @PostMapping("/Login")
    public String login(@RequestBody User user) {
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            return  jwtService.generateToken(user.getUserName(),user.getUserId());
        }
        else {return "Login Failed";}
    }

    @GetMapping("/Testing")
    public String testing(){
        return "wroking";
    }
}
