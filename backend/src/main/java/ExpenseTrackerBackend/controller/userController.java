package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.repo.userRepo;
import ExpenseTrackerBackend.service.JwtService;
import ExpenseTrackerBackend.service.userService;

import java.util.Optional;

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

    @PostMapping("/SignUp")
    public String signUp(@RequestBody User user) {
        return uService.createUser(user);
    }

    @PostMapping("/Login")
    public String login(@RequestBody User user) {
        return uService.login(user.getUserName(),user.getPassword());
    }

    @GetMapping("/Testing")
    public String testing(){
        return "wroking";
    }
}
