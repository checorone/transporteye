package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.repository.UsersTripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UsersTripService {
    private final UsersTripRepository usersTripRepository;

    public UsersTripService(UsersTripRepository usersTripRepository) {
        this.usersTripRepository = usersTripRepository;
    }

    public List<Map> getAllTripsByCardId(String cardId){
//        List<Map> res = usersTripRepository.getAllByCardId(cardId);
//        SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");
//        for (Map re : res) {
//            re = new HashMap(re);
//            re.put("date", format.format((Date)re.get("date")));
//        }
//        return res;
        return usersTripRepository.getAllByCardId(cardId);
    }
}
