package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.User;
import ExpenseTrackerBackend.repo.userRepo;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2Success implements AuthenticationSuccessHandler {

    @Autowired
    private userRepo userRepository;

    @Autowired
    private JwtService jwtService; // assumes you already have a JWT service

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // Extract OAuth2User details
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String name = oAuth2User.getAttribute("name");

        // Save or update user in DB
        User user = userRepository.findByUserName(name).orElseGet(() -> {
            User newUser = new User();
            newUser.setUserName(name);
            return userRepository.save(newUser);
        });
        String token = jwtService.generateToken(user.getUserName(),user.getUserId());
        response.setContentType("application/json");
        response.getWriter().write("{\"token\": \"" + token + "\"}");

        response.sendRedirect("http://localhost:5173/oauth2/redirect?token=" + token);

    }
}