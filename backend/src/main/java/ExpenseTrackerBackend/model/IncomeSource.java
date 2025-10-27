package ExpenseTrackerBackend.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Scope("prototype")
@Embeddable
public class IncomeSource {
    @Getter
    @GeneratedValue(strategy = GenerationType.UUID)
    private String incomeID;
    @Getter
    @Setter
    private int amount;

    @Getter @Setter
    private String incomeName;

    @Getter @Setter
    private Date date;

    @Getter
    @Setter
    private String recurringType; //monthly yearly or weekly or single

    @Getter
    @Setter
    private String description;
}
