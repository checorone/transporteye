import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../shared/services/resource.service';
import { environment } from 'src/environments/environment';
import { TransportModel } from '../shared/models/transport.model';

declare const google: any;

// interface ITransport {
//   transportId: number,
//   name: string,
//   seats: number,
//   emptySeats: number,
//   longitude: number,
//   latitude: number
// }

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.less']
})
export class MapsComponent implements OnInit {

  constructor(private resourceService: ResourceService) { }

  private map: any;
  private markers: google.maps.Marker[] = [];

  ngOnInit() {
    new EventSource(environment.TRANSPORTSERVERURI + 'api/v1/subscribe/transport').addEventListener('message', message => {
      this.updateMarkers(message);      
  });
    var myLatlng = new google.maps.LatLng(55.75222, 37.61556);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{
        "featureType": "water",
        "stylers": [{
          "saturation": 43
        }, {
          "lightness": -11
        }, {
          "hue": "#0088ff"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "hue": "#ff0000"
        }, {
          "saturation": -100
        }, {
          "lightness": 99
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#808080"
        }, {
          "lightness": 54
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ece2d9"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ccdca1"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#767676"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#b8cb93"
        }]
      }, {
        "featureType": "poi.park",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.sports_complex",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.medical",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "simplified"
        }]
      }]

    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.getData();
  }

  getData(): void {
    this.resourceService.getTransport().subscribe(this.setData.bind(this));
  }

  setData(data: TransportModel[]): void {
    data.forEach(transport => {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(transport.latitude, transport.longitude),
        title: transport.name + "\nНомер: " + transport.id + "\nЗагруженность: " + (transport.emptySeats / transport.seats) * 100 + "%"
      });

      marker.setMap(this.map);
      this.markers[transport.id] = marker;
    });
  }

  updateMarkers(message: any): void {
    let transport = JSON.parse(message.data);
    console.log(transport);
    this.markers[transport.id].setPosition(new google.maps.LatLng(transport.latitude, transport.longitude));
  }

}
