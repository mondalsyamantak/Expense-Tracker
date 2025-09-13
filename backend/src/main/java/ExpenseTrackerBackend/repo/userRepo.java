package ExpenseTrackerBackend.repo;

import ExpenseTrackerBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface userRepo extends JpaRepository<User,String> {
    List<User> findByUserName(String userName);
}
