package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class userService {
    @Autowired
    private userRepo userDAO;

    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    userRepo dao;
    @Autowired
    userDataService userDataService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String createUser(User user) {
        if (userDAO.findByUserName(user.getUserName()).isEmpty()) {
            user.setPassword(encoder.encode(user.getPassword()));
            userDAO.save(user);
            userDataService.createUserData(user);
            return jwtService.generateToken(user.getUserName(),user.getUserId());
        } else {
            return "Username already exists!";
        }
    }
    public User createUser(String username) {
        if (userDAO.findByUserName(username).isEmpty()){
            User user = new User();
            user.setUserName(username);
            user.setPassword(null);
            userDAO.save(user);
            userDataService.createUserData(user);
            return user;
        } else {
            return null;
        }
    }

    public String login(String userName,String password) {
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        if (authentication.isAuthenticated()) {
            return  jwtService.generateToken(userName,dao.getUserByUserName(userName).getUserId());
        }else {return "Login Failed";}
    }
}
