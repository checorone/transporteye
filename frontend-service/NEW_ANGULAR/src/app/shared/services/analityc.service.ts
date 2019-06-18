import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AnalitycService {
  private resourceService = environment.TRANSPORTSERVERURI;
  private analyticsUri = 'api/v1/analytics/';
  // private dataUri = 'api/v1/data/';
  private passengerTypesCountUri = this.resourceService + this.analyticsUri + 'passengers/types/all';
  private allValidationsCountUri = this.resourceService + this.analyticsUri + 'validations/all';
  private passengerOntripCountUri = this.resourceService + this.analyticsUri + 'passengers/ontrip';
  private freePassengersCountUri = this.resourceService + this.analyticsUri + 'passengers/free/all';
  private seatsTypesCountUri = this.resourceService + this.analyticsUri + 'seats/types/all';
  private transportTypesCountUri = this.resourceService + this.analyticsUri + 'transports/types/all';
  private averageTransportsLoadUri = this.resourceService + this.analyticsUri + 'transports/average/all';
  private averageSeatsLoadUri = this.resourceService + this.analyticsUri + 'seats/average/all';
  private mapDataUri = this.resourceService + this.analyticsUri + 'map/transport';
  // private transportDataUri = this.resourceService + this.dataUri + 'transport';
  // private cardDataUri = this.resourceService + this.dataUri + 'card';
  // private busStopDataUri = this.resourceService + this.dataUri + 'bus_stop';
  // private routeDataUri = this.resourceService + this.dataUri + 'route';

  constructor( private http: HttpClient) {
  }

  public getPassengerTypes(): Observable<any> {
    return this.http.get<any>(this.passengerTypesCountUri);
  }

  public getOntripPassengers(): Observable<any> {
    return this.http.get<any>(this.passengerOntripCountUri);
  }

  public getAllValidations(): Observable<any> {
    return this.http.get<any>(this.allValidationsCountUri);
  }

  public getSeatsTypesCount(): Observable<any> {
    return this.http.get<any>(this.seatsTypesCountUri);
  }

  public getTransportsTypesCount(): Observable<any> {
    return this.http.get<any>(this.transportTypesCountUri);
  }

  public getAverageSeatsLoad(): Observable<any> {
    return this.http.get<any>(this.averageSeatsLoadUri);
  }

  public getAverageTransportsLoad(): Observable<any> {
    return this.http.get<any>(this.averageTransportsLoadUri);
  }
  public getFreePassengers(): Observable<any> {
    return this.http.get<any>(this.freePassengersCountUri);
  }

  // public getTransportData(): Observable<any> {
  //   return this.http.get<any>(this.transportDataUri);
  // }
  //
  // public getCardData(): Observable<any> {
  //   return this.http.get<any>(this.cardDataUri);
  // }
  //
  // public getRouteData(): Observable<any> {
  //   return this.http.get<any>(this.routeDataUri);
  // }
  //
  // public getBusStopData(): Observable<any> {
  //   return this.http.get<any>(this.busStopDataUri);
  // }
  
    public getMapData(): Observable<any> {
    return this.http.get<any>(this.mapDataUri);
  }
}
