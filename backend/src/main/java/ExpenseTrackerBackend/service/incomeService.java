package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.IncomeSource;
import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class incomeService {

    public IncomeSource createIncomeSource(Map<String, String> body) {
        IncomeSource incomeSource = new IncomeSource();
        incomeSource.setIncomeName(body.get("incomeName"));
        incomeSource.setDescription(body.get("description"));
        incomeSource.setRecurringType(body.get("recurringType"));
        incomeSource.setAmount(Integer.parseInt((body.get("amount"))));
        return incomeSource;
    }
}
