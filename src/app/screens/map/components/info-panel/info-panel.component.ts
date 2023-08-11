import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SelectionManagerService } from '../../services/selection-manager.service';
import { Record } from 'pocketbase';
import { Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
})
export class InfoPanelComponent implements OnInit, OnDestroy {
  @Input() places: Record[] = [];

  selectedPlaceService!: Subscription;
  selectedDroneService!: Subscription;

  selectedPlace?: Record;
  selectedDrone?: Record;

  constructor(private selectionManger: SelectionManagerService) {}

  ngOnInit(): void {
    this.selectedPlaceService = this.selectionManger.selectedPlace.subscribe(
      (place) => {
        if (place) {
          this.selectedPlace = place;
        }
      }
    );

    this.selectedDroneService = this.selectionManger.selectedDrone.subscribe(
      (drone) => {
        if (drone) {
          this.selectedDrone = drone;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedPlaceService.unsubscribe();
    this.selectedDroneService.unsubscribe();
  }

  placeSelected(placeId: string) {
    for (let place of this.places) {
      if (place.id === placeId) {
        this.selectionManger.updateSelectedPlace(place);
      }
    }
  }

  droneSelected(droneId: string) {
    const place = this.selectionManger.getSelectedPlace();
    const drones = place ? (place['expand']['drones'] as Record[]) : undefined;

    if (drones) {
      for (let drone of drones) {
        if (drone.id === droneId) {
          this.selectionManger.updateSelectedDrone(drone);
        }
      }
    }
  }

  getDrones(place: Record) {
    const drones = place ? (place['expand']['drones'] as Record[]) : undefined;
    return drones;
  }
}
