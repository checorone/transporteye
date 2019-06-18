import {Injectable} from '@angular/core';
import {Transport} from '../models/transport.model'
import {BusStopModel} from "../models/bus-stop.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RouteModel} from "../models/route.model";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resServerUrl = 'http://localhost:8085/api/v1/data/';
  private busStopsUrl = this.resServerUrl + 'bus_stop';
  private transportUrl = this.resServerUrl + 'transport';
  private routesUrl = this.resServerUrl + 'route';

  constructor(private http: HttpClient) {
  }

  public getBusStops(): Observable<BusStopModel[]> {
    return this.http.get<BusStopModel[]>(this.busStopsUrl);
  }

  public getTransport(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.transportUrl);
  }

  public addBusStop(busStop: BusStopModel): Observable<any> {
    return this.http.post<any>(this.busStopsUrl, busStop);
  }

  public updateBusStop(busStop: BusStopModel): Observable<any> {
    return this.http.put<any>(this.busStopsUrl, busStop);
  }

  public addTransport(transport: Transport): Observable<any> {
    return this.http.post<any>(this.transportUrl, transport);
  }

  public updateTransport(transport: Transport): Observable<any> {
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
}
