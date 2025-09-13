package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userService {
    @Autowired
    private userRepo userDAO;
    public String createUser(User user) {
        if(userDAO.findByUserName(user.getUserName()).isEmpty()){
            User newUser = new User();
            userDAO.save(newUser);
            return newUser.getUserId();
        }else {
            return null;
        }
    }

    public String loginUser(User user) {
        if(userDAO.findByUserName(user.getUserName()).isEmpty()){
            return null;
        }else {
            return userDAO.findByUserName(user.getUserName()).toString();
        }
    }
}
