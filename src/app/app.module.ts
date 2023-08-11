import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { GoogleMapsComponent } from './screens/map/components/google-maps/google-maps.component';
import { MapComponent } from './screens/map/map.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { PocketbaseService } from './services/pocketbase.service';
import { DroneComponent } from './screens/map/components/google-maps/components/drone/drone.component';
import { InfoPanelComponent } from './screens/map/components/info-panel/info-panel.component';
import { SelectionManagerService } from './screens/map/services/selection-manager.service';
import { DroneDetailsComponent } from './screens/map/components/info-panel/components/drone-details/drone-details.component';
import { RealtimeService } from './services/realtime.service';
import { VideoPlayerComponent } from './screens/map/components/google-maps/components/video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    MapComponent,
    SettingsComponent,
    DroneComponent,
    InfoPanelComponent,
    DroneDetailsComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatExpansionModule,
  ],
  providers: [PocketbaseService, SelectionManagerService, RealtimeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
