import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  private _droneSN: any = {};

  get droneSN(): any {
    return this._droneSN;
  }

  @Input() set droneSN(droneId: string) {
    this._droneSN = {
      src: `http://192.168.186.2:8000/live/${droneId}/index.m3u8`,
      type: 'application/x-mpegURL',
    };

    if (this.player) {
      this.player.src(this._droneSN);
    }
  }

  player: any;

  constructor(private realtime: RealtimeService) {}

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(
      this.target.nativeElement,
      {
        fluid: true,
        autoplay: true,
        sources: [this.droneSN],
      }
      // function onPlayerReady(this: any) {
      //   console.log('onPlayerReady', this);
      // }
    );

    // this.target.nativeElement.addEventListener('error', (event: any) => {
    //   if (event.srcElement.error.code === 4) {

    //   }
    // });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  togglePlayPause() {
    console.log('play/Pause');

    if (this.player && !this.player.isDisposed()) {
      if (this.player.paused()) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  }
}
