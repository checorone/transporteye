import MapOptions = google.maps.MapOptions;
import LatLng = google.maps.LatLng;
import { FormGroup } from "@angular/forms";
import { BusStopModel } from "../shared/models/bus-stop.model";

export class MapPicker {
  private map: google.maps.Map;
  private uniqueMarker: google.maps.Marker;
  private nonUniqueMarkers: google.maps.Marker[] = [];

  constructor(docElement: HTMLElement, latitude = 55.75120559644067, longitude = 37.613815508323114) {
    let myLatlng = new google.maps.LatLng(latitude, longitude);
    let mapOptions: MapOptions = {
      zoom: 12,
      center: myLatlng,
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
    let latLng = new LatLng(latitude, longitude);
    this.map.setCenter(latLng);
    this.uniqueMarker = new google.maps.Marker({
      position: latLng,
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

  setBusStopsAndForm(stops: BusStopModel[], form: FormGroup): void {
    stops.forEach(el => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(el.latitude, el.longitude),
        title: 'id: ' + el.id + '\nНазвание: ' + el.name,
        map: this.map,
      });

      marker.addListener('click', () => {
        form.markAsDirty();
        form.controls['busStopList'].setValue(
          form.controls['busStopList'].value + marker.getTitle().split('\n')[0].split(':')[1]);
      });
      this.nonUniqueMarkers.push(marker);
    });
  }

  setBusStop(latitude: number, longitude: number, name: string): void {
    this.nonUniqueMarkers.push(new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      title: name,
      map: this.map,
    }));
  }

  setTransport(latitude: number, longitude: number, name: string): void {
    this.nonUniqueMarkers.push(new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      title: name,
      map: this.map,
      icon: this.pinSymbol('#FFFF00')
    }));
  }

  setHelpMarkers(elements: any[]): void {
    elements.forEach(el => {
      this.nonUniqueMarkers.push(new google.maps.Marker({
        position: new google.maps.LatLng(el.latitude, el.longitude),
        title: name,
        map: this.map,
        icon: {url: this.getPointIcon(), scaledSize: new google.maps.Size(20, 20)}
        // icon: this.pinSymbol('#FFFF00')
      }));
    });
  }

  clearMarkers() {
    this.nonUniqueMarkers.forEach((el) => {
      el.setMap(null);
    });
    this.nonUniqueMarkers = [];
  }

  pinSymbol(color) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#FFF',
      strokeWeight: 2,
      scale: 1,
    };
  }

  getPointIcon() {
    return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="-1.000000000000142 -1 94.00000000000003 93.99999999999994" width="90" height="90"><defs><path d="M90 45C90 69.84 69.84 90 45 90C20.16 90 0 69.84 0 45C0 20.16 20.16 0 45 0C69.84 0 90 20.16 90 45Z" id="aNvJAP1fh"></path><radialGradient id="gradientbXshQdH2k" gradientUnits="userSpaceOnUse" cx="41.61" cy="28.81" dx="41.61" dy="118.81" r="90"><stop style="stop-color: #50a4df;stop-opacity: 1" offset="0%"></stop><stop style="stop-color: #010000;stop-opacity: 1" offset="100%"></stop></radialGradient></defs><g><g><use xlink:href="#aNvJAP1fh" opacity="1" fill="url(#gradientbXshQdH2k)"></use><g><use xlink:href="#aNvJAP1fh" opacity="1" fill-opacity="0" stroke="#efefef" stroke-width="3" stroke-opacity="1"></use></g></g></g></svg>`);
  }



  getMap(){
    return this.map;
  }
}
