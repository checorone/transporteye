package org.ncstudy.transportservice.services;

import org.ncstudy.transportservice.model.*;
import org.ncstudy.transportservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.*;


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

    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private ValidationRepository validationRepository;
    @Autowired
    private PassengerStreamRepository passengerStreamRepository;
    @Autowired
    private TransportRepository transportRepository;
    @Autowired
    private RouteRepository routeRepository;

    /**
     * Возвращает хешмап с количеством пустых сидений и количеством всех сидений.
     *
     * @return Map[(" empty " : int) ("all": int)]
     */
    public Map<String, Integer> getAllSeatsTypesCount() {
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("first", getAllEmptySeats());
        map.put("second", getAllSeats());
        return map;
    }

    /**
     * Возвращает хешмап с количеством ТС на маршруте и количеством всех ТС в автопарке.
     *
     * @return Map[(" ontrip " : int) ("all": int)]
     */
    public Map<String, Integer> getAllTransportsTypesCount() {
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("first", getTransportCountOnTrip());
        map.put("second", getTransportCount());
        return map;
    }

    /**
     * Возвращает хешмап со средней загрузкой маршрутов и максимальным количеством машин на маршруте.
     *
     * @return Map[(" avg " : float) ("max": float)]
     */
    public Map<String, Double> getAverageRouteLoad() {
        Map<String, Double> map = new HashMap<String, Double>();
        map.put("first", 3.45);
        map.put("second", 5.0);
        return map;
    }

    /**
     * Возвращает хешмап со средней загрузкой транспорта и максимальным количеством занятых мест в транспорте.
     *
     * @return Map[(" avg " : float) ("max": float)]
     */
    public Map<String, Double> getAverageTransportLoad() {
        Map<String, Double> map = new HashMap<String, Double>();
        map.put("first", 33.21);
        map.put("second", 55.0);
        return map;
    }


    /**
     * Возвращает хешмап со всеми ТС в пути вместе с количеством пустых мест в них.
     *
     * @return
     */
    public List<TransportExt> getMapDataTransport() {
        //TODO: impl
        Random random = new Random();
        List<TransportExt> transportExts = new ArrayList<TransportExt>();
        List<Transport> tr = transportService.getAllTransports();
        for (Transport transport : tr) {
            TransportExt tempExt = new TransportExt();
            tempExt.transportId = transport.getId();
            tempExt.name = transport.getName();
            tempExt.seats = transport.getSeats();
            tempExt.longitude = transport.getLongitude();
            tempExt.latitude = transport.getLatitude();
            tempExt.emptySeats = random.nextInt(30);
            transportExts.add(tempExt);
        }
        return transportExts;
    }

    /**
     * Возвращает хешмап с количеством всех вошедших пассажиров, всех вышедших и тех, кто прошел валидацию.
     *
     * @return Map[(" in " : int) ("out": int) ("validated": int)]
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
     * @return Map[(" in " : int) ("out": int) ("validated": int)]
     */
    public Map<String, Long> getPassengerTypesCountOnStop(int busStopId) {
        Map<String, Long> map = new HashMap<String, Long>();
        map.put("in", getAllOnboardPassengersCountOnStop(busStopId));
        map.put("out", getAllDisboardPassengersCountOnStop(busStopId));
        map.put("validated", getAllValidationsCountOnStop(busStopId));
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

    public long getTransportCountOnRoute(int routeId) {
        long countOnRoute = tripRepository.countByRouteId(routeId);
        return countOnRoute;
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
    public long getAllValidationsCountOnStop(int busStopId) {
        long countOnStop = validationRepository.countByBusStopId(busStopId);
        return countOnStop;
    }

    /**
     * Возвращает пассажиров последней посадки, прошедших валидацию на конкретной остановке.
     * {@code null} если данной остановки не существует.
     *
     * @param busStopId идентификатор остановки
     * @return Количество пассажиров
     */
    public int getLastValidationsCountOnStop(int busStopId) {
        List<Validation> validations = validationRepository.getValidationByBusStopId(busStopId);
        int endId = 0;
        int trId = 0;
        for (Validation validation : validations) {
            if (validation.getTransportId() != trId) {
                trId = validation.getTransportId();
                endId = validation.getValidationId() - 1;
            }
        }
        int countOnStop = 0;
        for (Validation validation : validations) {
            if (validation.getValidationId() > endId) {
                countOnStop++;
            }
        }
        return countOnStop;
    }

    /**
     * Возвращает прибавку пассажиров последней посадки на остановке.
     * {@code null} если данной остановки не существует.
     *
     * @param busStopId идентификатор остановки
     * @return Количество пассажиров
     */
    public int getLastOnboardPassengersOnStop(int busStopId) {
        List<PassengerStream> passengerStreams = passengerStreamRepository.getPassengerStreamByBusStopId(busStopId);

        return passengerStreams.get(passengerStreams.size() - 1).getInCount();
    }

    /**
     * Возвращает всех пассажиров, не прошедших валидацию на конкретной остановке.
     * {@code null} если данной остановки не существует.
     *
     * @param busStopId идентификатор остановки
     * @return Количество пассажиров
     */
    public long getAllPassengersWithoutTicketOnStop(int busStopId) {
        long inCount = getAllOnboardPassengersCountOnStop(busStopId);
        long validationCount = getAllValidationsCountOnStop(busStopId);

        return inCount - validationCount;
    }

    /**
     * Возвращает всех пассажиров, зашедших в транспорт на конкретной остановке.
     * {@code null} если данной остановки не существует.
     *
     * @param busStopId идентификатор остановки
     * @return Количество пассажиров
     */
    public long getAllOnboardPassengersCountOnStop(int busStopId) {
        List<PassengerStream> passengerStreams = passengerStreamRepository.getPassengerStreamByBusStopId(busStopId);
        int inCount = 0;
        for (PassengerStream passengerStream : passengerStreams) {
            inCount += passengerStream.getInCount();
        }

        return inCount;
    }

    /**
     * Возвращает всех пассажиров, вышедших из транспорта на конкретной остановке.
     * {@code null} если данной остановки не существует.
     *
     * @param busStopId идентификатор остановки
     * @return Количество пассажиров
     */
    public long getAllDisboardPassengersCountOnStop(int busStopId) {
        List<PassengerStream> passengerStreams = passengerStreamRepository.getPassengerStreamByBusStopId(busStopId);
        int outCount = 0;
        for (PassengerStream passengerStream : passengerStreams) {
            outCount += passengerStream.getOutCount();
        }

        return outCount;
    }

    /**
     * Возвращает всех пассажиров, находящихся в общественном транспорте.
     *
     * @return Количество пассажиров
     */
    public int getAllPassengersOnTrip() {
        List<PassengerStream> passengerStreams = passengerStreamService.getAllPassengerStreams();
        int onTrip = 0;
        for (PassengerStream passengerStream : passengerStreams) {
            onTrip += passengerStream.getInCount() - passengerStream.getOutCount();
        }
        return onTrip;
    }

    /**
     * Возвращает пассажиров, находящихся в общественном транспорте, на конкретном маршруте.
     * {@code null} если данного маршрута не существует.
     *
     * @param routeId идентификатор маршрута
     * @return Количество пассажиров
     */
    public int getAllPassengersOnRoute(int routeId) {
        int onTrip = 0;
        List<Trip> trips = tripRepository.getTripByRouteId(routeId);
        List<PassengerStream> passengerStreams = passengerStreamService.getAllPassengerStreams();
        for (PassengerStream passengerStream : passengerStreams) {
            for (Trip trip : trips) {
                if (passengerStream.getTransportId() == trip.getTransportId()) {
                    onTrip += passengerStream.getInCount() - passengerStream.getOutCount();
                }
            }
        }
        return onTrip;
    }

    /**
     * Возвращает количество свободных мест в транспортном средстве.
     * {@code null} если данного транспорта не существует.
     *
     * @param transportId идентификатор ТС
     * @return Количество мест
     */
    public int getEmptySeatsOnTransport(int transportId) {
        List<PassengerStream> passengerStreams = passengerStreamRepository.getPassengerStreamByTransportId(transportId);
        int onBoard = 0;
        for (PassengerStream passengerStream : passengerStreams) {
            onBoard += passengerStream.getInCount() - passengerStream.getOutCount();
        }

        int seats = transportRepository.getTransportById(transportId).getSeats();
        return seats - onBoard;
    }

    /**
     * Возвращает количество свободных мест во всех транспортных средствах на маршруте.
     * {@code null} если данного маршрута не существует.
     *
     * @param routeId идентификатор маршрута
     * @return Количество мест
     */
    public int getEmptySeatsOnRoute(int routeId) {
        List<Trip> trips = tripRepository.getTripByRouteId(routeId);
        int emptySeats = 0;
        for (Trip trip : trips) {
            emptySeats += getEmptySeatsOnTransport(trip.getTransportId());
        }
        return emptySeats;
    }

    /**
     * Возвращает количество свободных мест во всех транспортных средствах на всех маршрутах.
     *
     * @return Количество мест
     */
    public int getAllEmptySeats() {
        int passCount = getAllPassengersOnTrip();
        int seatsCount = getAllSeats();
        return seatsCount - passCount;
    }

    /**
     * Возвращает количество всех доступных мест во всех транспортных средствах на всех маршрутах.
     *
     * @return Количество мест
     */
    public int getAllSeats() {
        int seatsCount = 0;
        List<Trip> trips = tripService.getAllTrips();
        List<Integer> transportIds = new ArrayList<>();
        for (Trip trip : trips) {
            transportIds.add(trip.getTransportId());
        }
        List<Transport> transports = transportService.getAllTransports();
        for (Transport transport : transports) {
            for (Integer integer : transportIds) {
                if (transport.getId() == integer) {
                    seatsCount += transport.getSeats();
                }
            }
        }
        return seatsCount;
    }

    /**
     * Возвращает все маршруты по которым перемещался указанный пользователь вместе с остановкой на которой он сел.
     * {@code null} если данного пользователя не существует.
     *
     * @param cardId идентификатор пользователя (номер его карты)
     * @return Станции посадки пользователя
     */
    public List<Pair<BusStop, Route>> getAllPassengerRoutesAndBoardingStops(int cardId) {

        return null;
    }
}
