package ExpenseTrackerBackend.repo;

import ExpenseTrackerBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface userRepo extends JpaRepository<User,String> {
    Optional<User> findByUserName(String userName);

    User getUserByUserName(String userName);
}
