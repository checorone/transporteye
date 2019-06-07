import { Injectable } from '@angular/core';
import { Transport } from '../models/transport.model'

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor() { }

  public getTransportData() : Transport[] {
    return [
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 40, latitude: 55.7522200,  longitude: 37.6155600},
      { id: "AB32P 150RU", name: 'LIAZ5433', fullness: 73, latitude: 55.7492200,  longitude: 37.6165600},
      { id: "AA51P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.7432200,  longitude: 37.6195600},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
      { id: "AA32P 150RU", name: 'LIAZ5433', fullness: 60, latitude: 55.43,  longitude: 53.43},
    ];
  }
 
  
}
