package ExpenseTrackerBackend.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Embeddable
public class IncomeSource {
    @Getter
    private String incomeID;
    @Getter
    @Setter
    private int amount;

    @Getter @Setter
    private String incomeName;

    @Getter @Setter
    private LocalDate date;

    @Getter @Setter
    private LocalDate updateDate;

    @Getter
    @Setter
    private String recurringType; //monthly yearly or weekly or single

    @Getter
    @Setter
    private String description;

    public IncomeSource() {
        this.incomeID = UUID.randomUUID().toString();
        this.date = LocalDate.now();
        this.updateDate = LocalDate.now();
    }

}