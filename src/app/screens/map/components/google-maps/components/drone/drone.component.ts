import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Record } from 'pocketbase';
import { Observable } from 'rxjs';
import { SelectionManagerService } from 'src/app/screens/map/services/selection-manager.service';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-drone',
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.scss'],
})
export class DroneComponent implements OnInit, OnDestroy {
  @Input('drone') droneId!: string;

  drone!: Record;

  markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/drone.png',
      anchor: { x: 18, y: 18, equals: () => false },
      scaledSize: { width: 36, height: 36, equals: () => false },
    },
    title: 'Drone',
  };

  position?: google.maps.LatLngLiteral;

  constructor(
    private pocketbase: PocketbaseService,
    public selectionManger: SelectionManagerService,
    private realtime: RealtimeService
  ) {}

  ngOnInit(): void {
    console.log('Started ' + this.droneId);
    this.pocketbase.pb
      .collection('drones')
      .getOne(this.droneId)
      .then((record) => {
        this.drone = record;
        this.setMarkerPosition(record['position']);

        this.realtime.subscribeToDrone(this.drone['serialNumber']);
        this.realtime.recentDronesData$.subscribe((droneData) => {
          if (
            droneData &&
            droneData['serialNumber'] === this.drone['serialNumber']
          ) {
            this.drone = droneData;
            this.setMarkerPosition(droneData['position']);
          }
        });
      });

    // this.pocketbase.pb.collection('drones').subscribe(this.droneId, (e) => {
    //   console.log(e.action);

    //   if (
    //     e.record['position'].latitude !== null &&
    //     e.record['position'].longitude !== null
    //   ) {
    //     this.drone = e.record;
    //     this.setMarkerPosition(e.record['position']);
    //     console.log('Change');
    //   }
    // });
  }

  ngOnDestroy(): void {
    console.log('Stopped ' + this.droneId);
    // this.pocketbase.pb.collection('drones').unsubscribe(this.droneId);

    this.realtime.unsubscribeFromDrone(this.drone['serialNumber']);
    this.selectionManger.updateSelectedDrone(undefined);
  }

  setMarkerPosition(position: any) {
    if (position.latitude !== null && position.longitude !== null) {
      this.position = {
        lat: position.latitude,
        lng: position.longitude,
      };
    }
  }
}
