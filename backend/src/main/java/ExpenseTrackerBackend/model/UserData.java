package ExpenseTrackerBackend.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@Scope("prototype")
@Entity
public class UserData {
    @Id
    @Getter
    @Setter
    private String userID = this.getUserID();
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
}
