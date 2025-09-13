package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
