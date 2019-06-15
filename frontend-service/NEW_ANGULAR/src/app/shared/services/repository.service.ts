import {Injectable} from '@angular/core';
import {Transport} from '../models/transport.model'
import {BusStopModel} from "../models/bus-stop.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
    private resServerUrl = 'http://localhost:8085/api/v1/';
    private busStopsUrl = this.resServerUrl + 'bus_stop';
    private transportUrl = this.resServerUrl + 'transport';

    constructor(private http:HttpClient) { }

  public getTransportData() : Transport[] {
    return [
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 40, latitude: 55.7522200,  longitude: 37.6155600},
      { id: "AB32P 150RU", name: 'LIAZ5433', workload: 73, latitude: 55.7492200,  longitude: 37.6165600},
      { id: "AA51P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.7432200,  longitude: 37.6195600},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', workload: 60, latitude: 55.43,  longitude: 53.43},
    ];
  }


    public getBusStops(): Observable<BusStopModel[]> {
        return this.http.get<BusStopModel[]>(this.busStopsUrl);
    }

    public getTransport(): Observable<Transport[]> {
        return this.http.get<Transport[]>(this.transportUrl);
    }

    public addBusStop(busStop: BusStopModel):Observable<any>{
        return this.http.post<any>(this.busStopsUrl, busStop);
    }

    public updateBusStop(busStop: BusStopModel):Observable<any>{
        return this.http.put<any>(this.busStopsUrl, busStop);
    }

    public addTransport(transport: Transport):Observable<any>{
        return this.http.post<any>(this.transportUrl, transport);
    }

    public updateTransport(transport: Transport):Observable<any>{
        return this.http.put<any>(this.busStopsUrl, transport);
    }
}
