import {Injectable} from '@angular/core';
import {TransportModel} from '../models/transport.model'
import {BusStopModel} from "../models/bus-stop.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RouteModel} from "../models/route.model";
import {TripModel} from "../models/trip.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resServerUrl = environment.TRANSPORTSERVERURI + 'api/v1/data/';
  private busStopsUrl = this.resServerUrl + 'bus_stop';
  private transportUrl = this.resServerUrl + 'transport';
  private routesUrl = this.resServerUrl + 'route';
  private tripUrl = this.resServerUrl + 'trip';

  constructor(private http: HttpClient) {
  }

  public getBusStops(): Observable<BusStopModel[]> {
    return this.http.get<BusStopModel[]>(this.busStopsUrl);
  }

  public getTransport(): Observable<TransportModel[]> {
    return this.http.get<TransportModel[]>(this.transportUrl);
  }

  public addBusStop(busStop: BusStopModel): Observable<any> {
    return this.http.post<any>(this.busStopsUrl, busStop);
  }

  public updateBusStop(busStop: BusStopModel): Observable<any> {
    return this.http.put<any>(this.busStopsUrl, busStop);
  }

  public addTransport(transport: TransportModel): Observable<any> {
    return this.http.post<any>(this.transportUrl, transport);
  }

  public updateTransport(transport: TransportModel): Observable<any> {
    return this.http.put<any>(this.transportUrl, transport);
  }

  public deleteBusStop(id: string): Observable<any> {
    return this.http.delete<any>(this.busStopsUrl + '/' + id);
  }

  public deleteTransport(id: string): Observable<any> {
    return this.http.delete<any>(this.transportUrl + '/' + id);
  }

  public getRoutes(): Observable<RouteModel[]> {
    return this.http.get<RouteModel[]>(this.routesUrl);
  }

  public addRoute(route: RouteModel): Observable<any> {
    return this.http.post<any>(this.routesUrl, route);
  }

  public updateRoute(route: RouteModel): Observable<any> {
    return this.http.put<any>(this.routesUrl, route);
  }


  public deleteRoute(id: string): Observable<any> {
    return this.http.delete<any>(this.routesUrl + '/' + id);
  }

  public getTrips(): Observable<TripModel[]>{
    return this.http.get<TripModel[]>(this.tripUrl);
  }

  public getBusStopsByIds(ids: number[]): Observable<BusStopModel[]>{
    return this.http.post<any>(this.busStopsUrl+'/part', ids);
  }
}
  