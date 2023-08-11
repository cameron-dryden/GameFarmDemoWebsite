import { Component, Input } from '@angular/core';
import { Record } from 'pocketbase';

@Component({
  selector: 'app-drone-details',
  templateUrl: './drone-details.component.html',
  styleUrls: ['./drone-details.component.scss'],
})
export class DroneDetailsComponent {
  @Input() drone!: Record;
}
