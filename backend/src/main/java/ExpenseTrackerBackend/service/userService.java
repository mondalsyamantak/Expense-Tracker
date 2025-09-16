package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.User;
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

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String createUser(User user) {
        if (userDAO.findByUserName(user.getUserName()).isEmpty()) {
            user.setPassword(encoder.encode(user.getPassword()));
            userDAO.save(user);
            return jwtService.generateToken(user.getUserName(),user.getUserId());
        } else {
            return "Username already exists!";
        }
    }

    public String login(String userName,String password) {
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        if (authentication.isAuthenticated()) {
            return  jwtService.generateToken(userName,dao.getUserByUserName(userName).getUserId());
        }else {return "Login Failed";}
    }
}
