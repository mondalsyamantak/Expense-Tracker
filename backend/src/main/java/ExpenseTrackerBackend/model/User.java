package ExpenseTrackerBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    private String userId;
    @Getter
    @Setter
    private String userName;
    @Getter
    @Setter
    private String email;
    @Getter
    @Setter
    private String password;
    @Getter
    @Setter
    private String profilePicture;
    @Getter
    @Setter
    private String work;
}
