import MapOptions = google.maps.MapOptions;
import {FormGroup} from "@angular/forms";
import {BusStopModel} from "../shared/models/bus-stop.model";

export class MapPicker {
  private map: google.maps.Map;
  private uniqueMarker: google.maps.Marker;
  private nonUniqueMarkers: google.maps.Marker[] = [];

  constructor(docElement: HTMLElement, latitude = 37.61556, longitude = 55.75222) {
    let myLatlng = new google.maps.LatLng(latitude, longitude);
    let mapOptions: MapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
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
    this.map = new google.maps.Map(docElement, mapOptions);
  }

  setUniqueMarker(latitude: number, longitude: number, description: string): void {
    this.uniqueMarker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      title: description,
      map: this.map
    });
  }

  updateFormOnClickOn(form: FormGroup) {
    this.map.addListener('click', (event => {
      form.markAsDirty();
      form.controls['latitude'].setValue(event.latLng.lat());
      form.controls['longitude'].setValue(event.latLng.lng());
      if (this.uniqueMarker)
        this.uniqueMarker.setPosition(event.latLng);
      else
        this.uniqueMarker = new google.maps.Marker({
          position: event.latLng,
          map: this.map
        });
    }));
  }

  setBusStopsAndForm(stops: BusStopModel[], form: FormGroup) {
    console.log(stops)
    stops.forEach(el => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(el.latitude, el.longitude),
        title: 'id: '+el.id+'\nНазвание: '+el.name,
        map: this.map,
      });

      marker.addListener('click', () => {
        console.log(marker.getTitle());
        form.markAsDirty();
        form.controls['busStopList'].setValue(
        form.controls['busStopList'].value + marker.getTitle().split('\n')[0].split(':')[1]);
      });
      this.nonUniqueMarkers.push(marker);
    });
  }
}
