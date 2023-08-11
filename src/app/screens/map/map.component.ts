import { Component, OnInit } from '@angular/core';
import { Record } from 'pocketbase';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { SelectionManagerService } from './services/selection-manager.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  places: Record[] = [];
  isLoading: boolean = true;

  constructor(
    private pocketbase: PocketbaseService,
    private selectionManger: SelectionManagerService
  ) {}

  ngOnInit(): void {
    this.loadPlaces().then((places) => {
      this.places = places;
      this.selectionManger.updateSelectedPlace(places[0]);

      this.isLoading = false;
    });
  }

  async loadPlaces() {
    const places = await this.pocketbase.pb.collection('places').getFullList({
      filter: 'owners.name ~ "Cameron"',
      expand: 'drones',
    });
    return places;
  }
}
