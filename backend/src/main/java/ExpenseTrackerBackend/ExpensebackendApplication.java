package ExpenseTrackerBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;

@EnableCaching
@SpringBootApplication
public class ExpensebackendApplication {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(ExpensebackendApplication.class, args);
		System.out.println("working");
	}

}
