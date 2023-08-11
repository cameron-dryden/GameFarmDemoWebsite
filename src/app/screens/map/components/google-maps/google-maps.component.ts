import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { SelectionManagerService } from '../../services/selection-manager.service';
import { Record } from 'pocketbase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('googleMap', { static: true }) googleMap!: GoogleMap;

  selectedPlaceService!: Subscription;
  selectedDroneService!: Subscription;

  selectedDroneSN: string | undefined = undefined;

  options: google.maps.MapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    mapTypeId: 'satellite',
  };

  boundary: google.maps.PolygonOptions = {
    clickable: false,
    fillOpacity: 0,
    strokeColor: 'red',
  };
  boundaryPath: google.maps.LatLngLiteral[] = [];

  drones: string[] = [];

  constructor(private selectionManger: SelectionManagerService) {}

  ngAfterViewInit() {
    this.selectedPlaceService = this.selectionManger.selectedPlace.subscribe(
      (place) => {
        if (place) {
          this.googleMap.panTo({
            lat: place['locationCenter'].latitude,
            lng: place['locationCenter'].longitude,
          });

          this.updateMapSettings(place);
        }
      }
    );

    this.selectedDroneService = this.selectionManger.selectedDrone.subscribe(
      (drone) => {
        if (drone) {
          this.googleMap.panTo({
            lat: drone['position'].latitude,
            lng: drone['position'].longitude,
          });

          this.selectedDroneSN = drone['serialNumber'];
        } else {
          this.selectedDroneSN = undefined;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedPlaceService.unsubscribe();
    this.selectedDroneService.unsubscribe();
  }

  updateMapSettings(place: Record) {
    // Set map bounds (use lat or lon to determine boundaries)

    this.boundaryPath = [];
    if (place['locationBoundary'] !== null) {
      for (let vertices of place['locationBoundary']) {
        this.boundaryPath.push({
          lat: vertices.latitude,
          lng: vertices.longitude,
        });
      }
    }

    this.drones = place['drones'];
  }
}
