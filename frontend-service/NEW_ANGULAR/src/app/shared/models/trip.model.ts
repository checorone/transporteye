export interface TripModel {
  id: number;
  card_id: string;
  date: string;

  bus_stop_id: number;
  bus_stop_name: string;
  bus_stop_latitude: number;
  bus_stop_longitude: number;

  transport_id: number;
  transport_name: string;
  transport_latitude: number;
  transport_longitude: number;
  seats: number;
}