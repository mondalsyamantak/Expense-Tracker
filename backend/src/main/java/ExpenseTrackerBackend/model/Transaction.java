package ExpenseTrackerBackend.model;

import jakarta.persistence.Embeddable;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Scope("prototype")
@Embeddable
public class Transaction {
    private int amount;
    private Date date;
    private String type;
    private String description;
}
