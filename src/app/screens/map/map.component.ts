import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LiveDroneData } from './interfaces/LiveDroneData.interface';
import { MarkerOptions } from './interfaces/MarkerOptions.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  droneData: LiveDroneData | null = null;
  droneMarker!: MarkerOptions;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<LiveDroneData>('http://192.168.186.2:3000/api/drone')
      .subscribe((response) => {
        console.log(response);
        this.droneData = response;
        this.updateDroneMapMarker(this.droneData);
      });
  }

  updateDroneMapMarker(droneData: LiveDroneData): void {
    if (droneData) {
      console.log('We have data');
      if (
        droneData.position.latitude !== null &&
        droneData.position.longitude !== null
      ) {
        console.log('The data has values');
        this.droneMarker.position.lat = droneData.position.latitude;
        this.droneMarker.position.lng = droneData.position.longitude;
        this.droneMarker.label = 'Drone';
      }
    }
  }
}
