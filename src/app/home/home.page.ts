import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import {
  Environment, GoogleMap, GoogleMaps, GoogleMapOptions,
  GoogleMapsEvent, GoogleMapsAnimation, Marker, Geocoder, ILatLng
} from '@ionic-native/google-maps';
import { async } from 'q';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  private loading: any;
  private map: GoogleMap;
  public search = '';
  private googleAutoComplete = new google.maps.places.AutocompleteService();
  private googleDirectionService = new google.maps.DirectionsService();
  public searchResults = new Array<any>();
  private originMarker: Marker;
  public destination: any;

  constructor(private platform: Platform, private loadingCtrl: LoadingController, private ngZone: NgZone) {
    console.log(this.googleAutoComplete);
  }

  ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;

    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';

    this.loadMap();
  }

  async loadMap() {
    this.loading = await this.loadingCtrl.create({ message: 'Conecanto ao servidor de dados...' });
    await this.loading.present();

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: '',
      API_KEY_FOR_BROWSER_DEBUG: ''
    });

    const mapOptions: GoogleMapOptions = {
      controls: { zoom: false }
    };

    this.map = GoogleMaps.create(this.mapElement, mapOptions);

    try {
      this.map.one(GoogleMapsEvent.MAP_READY);
      this.addOrginMarker();
    } catch (error) {
      console.log(error);
    }
  }

  async addOrginMarker() {
    try {
      const myLocation = await this.map.getMyLocation();

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

      this.originMarker = this.map.addMarkerSync({
        title: 'Origem',
        icon: '#000',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  // search
  onSearchChange() {
    if (!this.search.trim().length) { return; }
    this.googleAutoComplete.getPlacePredictions({ input: this.search }, prediction => {
      this.ngZone.run(() => {
        this.searchResults = prediction;
      });
    });
  }

  async onCalcRoute(result: any) {
    this.search = '';
    this.destination = result;

    const info: any = await Geocoder.geocode({
      address: this.destination.description
    });

    const markerDestination: Marker = this.map.addMarkerSync({
      title: this.destination.description,
      icon: '#5cb85c',
      animation: GoogleMapsAnimation.BOUNCE,
      position: info[0].position
    });

    this.googleDirectionService.route({
      origin: this.originMarker.getPosition(),
      destination: markerDestination.getPosition(),
      travelMode: 'DRIVING'
    }, async results => {

      const pointers = new Array<ILatLng>();
      const routes = results.routes[0].overview_path;

      for (let i = 0; i < routes.length; i++) {
        pointers[i] = {
          lat: routes[i].lat(),
          lng: routes[i].lng()
        };
      }
      await this.map.addPolyline({
        points: pointers,
        color: '#000',
        width: 3
      });

      await this.map.moveCamera({ target: pointers });
      this.map.panBy(0, 100);
    });
  }


  async onBack() {
    try {
      await this.map.clear();
      this.destination = null;
      this.addOrginMarker();
    } catch (error) {
      console.log(error);
    }
  }
}
