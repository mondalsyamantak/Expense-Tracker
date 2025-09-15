package ExpenseTrackerBackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
public class UserData {

    @Id
    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "userID") // foreign key column in UserData table
    private User user;

    @Getter
    @Setter
    @ElementCollection
    private Set<Transaction> transactionHistory = new HashSet<>();

    @Getter
    @Setter
    private int upiTransaction;

    @Getter
    @Setter
    private int cashTransaction;

    @Getter
    @Setter
    private int cardTransaction;

    @Getter
    @Setter
    private int travelExpense;

    @Getter
    @Setter
    private int foodExpense;

    @Getter
    @Setter
    private int miscellaneousExpense;

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
