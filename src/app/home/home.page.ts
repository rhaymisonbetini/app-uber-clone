import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, GoogleMapsAnimation } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private platform: Platform, private loadingCtrl: LoadingController) { }

  @ViewChild('map', { static: true }) mapElement: any;
  private loading: any;
  private map: GoogleMap;

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
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyCXYlrKX3x3MRFqf8VLipI-FLz0DmJDRu8',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyCXYlrKX3x3MRFqf8VLipI-FLz0DmJDRu8'
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

      this.map.addMarkerSync({
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

  onSearchChange(event) {

  }
}
