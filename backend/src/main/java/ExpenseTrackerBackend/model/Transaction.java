package ExpenseTrackerBackend.model;

import jakarta.persistence.Embeddable;

import java.util.Date;

@Embeddable
public class Transaction {
    private int amount;
    private Date date;
    private String type;
    private String description;
}
