import { Component, OnInit } from '@angular/core';
import { MapPicker } from '../entities/map-picker';
import { ResourceService } from '../shared/services/resource.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-transport-fake-route',
  templateUrl: './transport-fake-route.component.html',
  styleUrls: ['./transport-fake-route.component.less']
})
export class TransportFakeRouteComponent implements OnInit {

  constructor(private resService: ResourceService, private adminService: AdminService) { }
  lat: number[] = [];
  lng: number[] = [];

  ngOnInit() {
    let map = new MapPicker(document.getElementById('map'));
    this.resService.getBusStops().subscribe(res => {
      map.setHelpMarkers(res);
    })
    map.getMap().addListener('click', event=>{
      this.lat.push(event.latLng.lat());
      this.lng.push(event.latLng.lng());
    })
  }
  
  onClick(){
    console.log(this.lat);
    console.log(this.lng);
  }
}
