import { Injectable } from '@angular/core';
import { Record } from 'pocketbase';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SelectionManagerService {
  private selectedPlaceSource = new BehaviorSubject<Record | undefined>(
    undefined
  );

  private selectedDroneSource = new BehaviorSubject<any>(undefined);

  selectedPlace = this.selectedPlaceSource.asObservable();
  selectedDrone = this.selectedDroneSource.asObservable();

  updateSelectedPlace(place: Record) {
    this.selectedPlaceSource.next(place);
  }

  updateSelectedDrone(drone: any) {
    this.selectedDroneSource.next(drone);
  }

  getSelectedPlace() {
    return this.selectedPlaceSource.getValue();
  }

  getSelectedDrone() {
    return this.selectedDroneSource.getValue();
  }
}
