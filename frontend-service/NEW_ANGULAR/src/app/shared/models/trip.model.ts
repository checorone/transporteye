import {BusStopModel} from "./bus-stop.model";
import {TransportModel} from "./transport.model";

export interface TripModel {
  id: number;
  cardId: string;
  date: string;
  busStop: BusStopModel;
  transport: TransportModel;
}