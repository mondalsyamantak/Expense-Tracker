package ExpenseTrackerBackend.controller;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class userController {
    @Autowired
    private userService uService;

    @GetMapping("/SignUp")
    public String signUp(@RequestBody User user) {
        return uService.createUser(user);
    }

    @GetMapping("/Login")
    public String Login(@RequestBody User user) {
        return uService.loginUser(user);
    }

}
