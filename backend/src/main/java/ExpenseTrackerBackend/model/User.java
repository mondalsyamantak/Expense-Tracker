package ExpenseTrackerBackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "users")
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
    @Getter
    @Setter
    private String displayName;
}
