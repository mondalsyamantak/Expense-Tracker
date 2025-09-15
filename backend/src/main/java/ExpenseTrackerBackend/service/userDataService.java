package ExpenseTrackerBackend.service;

import ExpenseTrackerBackend.model.UserData;
import ExpenseTrackerBackend.repo.userDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class userDataService {

    @Autowired
    userDataRepo dao;

    //profile picture,display name,
    public Map<String, String> getBasicData(String userID) {
        Optional<UserData> userDataOpt = dao.findById(userID);
        Map<String, String> basicUserData = new HashMap<>();

        basicUserData.put("profilePicture",
                userDataOpt.map(UserData::getProfilePicture).orElse(null));

        basicUserData.put("displayName",
                userDataOpt.map(UserData::getDisplayName).orElse(null));


        return basicUserData;
    }
}
