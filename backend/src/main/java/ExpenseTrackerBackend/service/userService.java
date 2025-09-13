package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {
    @Autowired
    private userRepo userDAO;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String createUser(User user) {
        if (userDAO.findByUserName(user.getUserName()).isEmpty()) {
            user.setPassword(encoder.encode(user.getPassword()));
            userDAO.save(user);
            return user.getUserId();
        } else {
            return "Username already exists!";
        }
    }
}
