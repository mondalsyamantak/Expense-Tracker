package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class transactionService {


    public Transaction createTransaction(Map<String, String> body){
        Transaction transaction = new Transaction();
        transaction.setAmount(Integer.parseInt(body.get("amount")));
        transaction.setType(body.get("type"));
        transaction.setDescription(body.get("description"));
        transaction.setExpenseType(body.get("expenseType"));
        return transaction;
    }
}
