package ExpenseTrackerBackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Entity
public class UserData {

    @Id
    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "userID")
    @Setter
    @Getter
    private User user;

    @Getter
    @ElementCollection
    private List<Transaction> transactionHistory = new ArrayList<>();

    @Getter
    @Setter
    private int upiTransaction;

    @Getter
    @Setter
    private long income;

    @Getter
    @Setter
    private int cashTransaction;

    @Getter
    @Setter
    private int cardTransaction;

    @Getter @Setter
    private int totalExpense;

    @Getter
    @ElementCollection
    @CollectionTable(
            name = "user_expenses",
            joinColumns = @JoinColumn(name = "id")
    )
    @MapKeyColumn(name = "category")
    @Column(name = "amount")
    private Map<String, Integer> expense = new TreeMap<>();

    @Getter
    @Setter
    private String profilePicture;

    @Getter
    @Setter
    private String work;

    @Getter
    @Setter
    private String displayName;

    public UserData(){
        totalExpense = 0;
        expense.put("travelExpense",0);
        expense.put("foodExpense",0);
    }

    public void setTransactionHistory(Transaction transaction) {
        transactionHistory.add(transaction);
    }

    public Map<String, Integer> setExpense(String category, int amount) throws RuntimeException {
        if(expense.containsKey(category)){
            expense.put(category, expense.get(category) + amount);
            return expense;
        }else if(amount > 0){
            expense.put(category, amount);
            return expense;
        }else if (!expense.containsKey(category) && amount == 0) {
            expense.put(category, 0);
            return expense;
        }else throw new RuntimeException("Expense defined properly");
    }

    public void setTransactionHistory(List<Transaction> transactionHistory) {
        this.transactionHistory = transactionHistory;
    }
}
