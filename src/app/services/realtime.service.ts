import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable()
export class RealtimeService {
  socket = io('http://192.168.186.2:8080/client');

  private droneDataSource = new BehaviorSubject<any>(undefined);

  recentDronesData$ = this.droneDataSource.asObservable();

  constructor() {
    this.socket.on('droneUpdate', (droneData: any) => {
      this.droneDataSource.next(droneData);
    });
  }

  subscribeToDrone(drone: string) {
    this.socket.emit('joinRoom', drone);
  }

  unsubscribeFromDrone(drone: string) {
    this.socket.emit('leaveRoom', drone);
  }
}
