import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MarkerOptions } from '../../interfaces/MarkerOptions.interface';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent {
  @Input() markers: MarkerOptions[] = [];

  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    mapTypeId: 'satellite',
    center: { lat: -33.848772494404756, lng: 18.63915806767608 },
  };

  constructor(httpClient: HttpClient) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization

    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyADm9Cc3ZLn8fR0BwEE-tfzeKMYBWOtxMc',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
