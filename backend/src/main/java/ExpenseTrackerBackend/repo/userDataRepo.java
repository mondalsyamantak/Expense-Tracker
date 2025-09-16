package ExpenseTrackerBackend.repo;

import ExpenseTrackerBackend.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userDataRepo extends JpaRepository<UserData,String> {
    Optional<UserData> findById(String id);
}
