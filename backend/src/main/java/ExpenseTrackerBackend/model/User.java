package ExpenseTrackerBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class User {
    @Id
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
