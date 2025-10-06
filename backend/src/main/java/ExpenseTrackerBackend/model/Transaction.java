package ExpenseTrackerBackend.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
@Scope("prototype")
@Embeddable
public class Transaction {
    @Getter
    private String transactionID;
    @Getter
    @Setter
    private int amount;

    @Getter
    private Date date;
    @Getter
    @Setter
    private String type;
    @Getter
    @Setter
    private String expenseType;
    @Getter
    @Setter
    private String description;

    public Transaction() {
        this.date = new Date();
        this.transactionID = UUID.randomUUID().toString();
    }

}
