package org.ncstudy.transportservice.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.ncstudy.transportservice.model.BusStop;
import org.ncstudy.transportservice.model.PassengerStream;
import org.ncstudy.transportservice.model.Route;
import org.ncstudy.transportservice.model.Transport;
import org.ncstudy.transportservice.model.Trip;
import org.ncstudy.transportservice.model.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;


@Service
public class AnalyticsService {
    @Autowired
    private PassengerStreamService passengerStreamService;
    @Autowired
    private ValidationService validationService;
    @Autowired
    private TransportService transportService;
    @Autowired
    private TripService tripService;
    @Autowired
    private RouteService routeService;
    @Autowired
    private BusStopService busStopService;

	/**
	 * Возвращает хешмап с количеством всех вошедших пассажиров, всех вышедших и тех, кто прошел валидацию.
	 *
	 * @return Map[("in": int) ("out": int) ("validated": int)]
	 */
    public Map<String, Integer> getAllPassengerTypesCount() {
    	Map<String, Integer> map = new HashMap<String, Integer>();
    	map.put("in", 0);
    	map.put("out", 0);
    	map.put("validated", 0);
    	List<PassengerStream> pStreams = passengerStreamService.getAllPassengerStreams();
    	for (PassengerStream passengerStream : pStreams) {
    		map.put("in", map.get("in") + passengerStream.getInCount());
    		map.put("out", map.get("out") + passengerStream.getOutCount());
		}
    	List<Validation> validations = validationService.getAllValidations();
    	map.put("validated", validations.size());
		return map;
    }
    
    /**
	 * Возвращает хешмап с количеством вошедших пассажиров, вышедших и тех, 
	 * кто прошел валидацию на конкретной остановке.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Map[("in": int) ("out": int) ("validated": int)]
	 */
    public Map<String, Integer> getPassengerTypesCountOnStop(int busStopId) {
    	Map<String, Integer> map = new HashMap<String, Integer>();
    	//TODO: method impl
    	//Использовать следующие методы: 
    	//getAllDisboardPassengersCountOnStop(busStopID)
    	//getAllValidationsCountOnStop(busStopId);
    	//getAllOnboardPassengersCountOnStop(busStopID);
    	return map;
    }
    
    
	/**
	 * Возвращает количество ТС, находящихся на всех маршрутах. 
	 *
	 * @return Количество ТС 
	 */
    public int getTransportCountOnTrip() {
    	List<Trip> trips = tripService.getAllTrips();
    	return trips.size();
    }
    
	/**
	 * Возвращает все ТС, находящихся на конкретном маршруте. 
	 * {@code null} если данного маршрута не существует.
	 *
	 * @param routeId идентификатор маршрута
	 * @return Количество ТС 
	 */
    public int getTransportCountOnRoute(int routeId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает все ТС в автопарке. 
	 *
	 * @return Количество ТС 
	 */
    public int getTransportCount() {
    	List<Transport> transports = transportService.getAllTransports();
    	return transports.size();
    }
    
	/**
	 * Возвращает всех пассажиров, прошедших валидацию на всех маршрутах. 
	 *
	 * @return Количество пассажиров 
	 */
    public int getAllValidationsCount() {
    	List<Validation> validations = validationService.getAllValidations();
    	return validations.size();
    }
    
	/**
	 * Возвращает всех пассажиров, прошедших валидацию на конкретной остановке. 
	 * {@code null} если данной остановки не существует.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Количество пассажиров 
	 */
    public int getAllValidationsCountOnStop(int busStopId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает пассажиров последней посадки, прошедших валидацию на конкретной остановке. 
	 * {@code null} если данной остановки не существует.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Количество пассажиров 
	 */
    public int getLastValidationsCountOnStop(int busStopId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает прибавку пассажиров после оследней посадки на остановке. 
	 * {@code null} если данной остановки не существует.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Количество пассажиров 
	 */
	public int getLastOnboardPassengersOnStop(int busStopId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
	}
	
	/**
	 * Возвращает всех пассажиров, не прошедших валидацию на конкретной остановке. 
	 * {@code null} если данной остановки не существует.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Количество пассажиров 
	 */
    public int getAllPassengersWithoutTicketOnStop(int busStopId) {
    	//TODO: method impl
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает всех пассажиров, зашедших в транспорт на конкретной остановке. 
	 * {@code null} если данной остановки не существует.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Количество пассажиров 
	 */
    public int getAllOnboardPassengersCountOnStop(int busStopId) {
    	//TODO: method impl
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
    /**
	 * Возвращает всех пассажиров, вышедших из транспорта на конкретной остановке. 
	 * {@code null} если данной остановки не существует.
	 *
	 * @param busStopId идентификатор остановки
	 * @return Количество пассажиров 
	 */
    public int getAllDisboardPassengersCountOnStop(int busStopId) {
    	//TODO: method impl
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает всех пассажиров, находящихся в общественном транспорте. 
	 *
	 * @return Количество пассажиров 
	 */
    public int getAllPassengersOnTrip() {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает пассажиров, находящихся в общественном транспорте, на конкретном маршруте. 
	 * {@code null} если данного маршрута не существует.
	 *
	 * @param routeId идентификатор маршрута
	 * @return Количество пассажиров 
	 */
    public int getAllPassengersOnRoute(int routeId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает количество свободных мест в транспортном средстве. 
	 * {@code null} если данного транспорта не существует.
	 *
	 * @param transportId идентификатор ТС
	 * @return Количество мест 
	 */
    public int getEmptySeatsOnTransport(int transportId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает количество свободных мест во всех транспортных средствах на маршруте. 
	 * {@code null} если данного маршрута не существует.
	 *
	 * @param routeId идентификатор маршрута
	 * @return Количество мест 
	 */
    public int getEmptySeatsOnRoute(int routeId) {
		//TODO: Method implementation
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает количество свободных мест во всех транспортных средствах на всех маршрутах. 
	 *
	 * @return Количество мест 
	 */
    public int getAllEmptySeats() {
    	int passcount = 0;
    	List<PassengerStream> pStreams = passengerStreamService.getAllPassengerStreams();
    	for (PassengerStream passengerStream : pStreams) {
    		passcount += passengerStream.getInCount() - passengerStream.getOutCount();
		}
    	int seatscount = 0;
    	List<Transport> transports = transportService.getAllTransports();
    	for (Transport transport : transports) {
			seatscount += transport.getSeats();
		}
		return seatscount - passcount;
    }
    
	/**
	 * Возвращает количество всех доступных мест во всех транспортных средствах на всех маршрутах. 
	 *
	 * @return Количество мест 
	 */
    public int getAllSeats() {
//    	int seatscount = 0;
//    	List<Transport> transports = transportService.getAllTransports();
//    	for (Transport transport : transports) {
//			seatscount += transport.getSeats();
//		}
//		return seatscount;
		//TODO: Method implementation
    	// Нужно сделать выборку не из транспорта, а из трипов, так как транспорт может просто стоять в парке
    	Random random = new Random();
    	return random.nextInt(30) + 20;
    }
    
	/**
	 * Возвращает все маршруты по которым перемещался указанный пользователь вместе с остановкой на которой он сел. 
	 * {@code null} если данного пользователя не существует.
	 *
	 * @param cardId идентификатор пользователя (номер его карты)
	 * @return Станции посадки пользователя
	 */
    public List<Pair<BusStop, Route>> getAllPassengerRotesAndBoardingStops(int cardId) {
		//TODO: Method implementation
    	//НИЖЕ ЗАГЛУШККА
    	Random random = new Random();
    	List<Pair<BusStop, Route>> outList = new ArrayList<Pair<BusStop, Route>>();
    	List<Route> routesList = routeService.getAllRoutes();
    	for (Route route : routesList) {
			String[] busStopList = route.getBusStopList().split(" ");
			int index = random.nextInt(busStopList.length);
			BusStop bsBusStop = busStopService.getBusStopById(Integer.parseInt(busStopList[index]));
			outList.add(Pair.of(bsBusStop, route));
		}
    	return outList;
    }
}
