import { ActivatedRoute } from '@angular/router';
import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Games } from '../component/game-clips/game-clips.component';
import { ClipService, IClip } from '../services/clip.service';
import { DatePipe } from '@angular/common';
import videojs from 'video.js';

const dummyUser: any = {
  name: 'magesh',
  uid: '849239hsdjhf92',
};

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit, DoCheck {
  games_asset?: Games[];

  game_id: string = '';
  game_details: any;

  clip_user?: any = dummyUser;
  // ! player
  player?: videojs.Player;

  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  constructor(private route: ActivatedRoute, private clip: ClipService) {
    this.game_id = this.route.snapshot.params['id'];

    const res = this.clip.getVideoDetail(this.game_id).then((res) => {
      // get user detail

      this.clip.getUserDetail(res.uid).then((user) => {
        this.clip_user = user;
      });
    });
  }
  ngOnInit(): void {
    this.game_id = this.route.snapshot.params['id'];
    this.player = videojs(this.target?.nativeElement);
    this.route.data.subscribe((data) => {
      this.game_details = data['clip'];
      this.player?.src({
        src: this.game_details.url,
      });
    });
  }

  //! this will check when again route change
  ngDoCheck(): void {}
}

`  <section class="my-8 mx-2 bg-secondary p-6">
    <div class="flex items-center justify-center"
      *ngIf="!game_details; else videoContent"
    >
      <h1 class="text-3xl">Fetching Game Details ⌛</h1>
      <span class="material-icons text-center text-7xl p-8 animate-spin">
        settings
      </span>
    </div>
    <ng-template #videoContent>
      <div class="rounded flex flex-col">
        <!-- Title and Uploader -->
        <h1 class="font-bold mb-2 text-3xl">{{ game_details?.title }}</h1>
        <div class="text-gray-400 mb-6">
          Uploaded By {{ game_details?.displayName }}

          <span *ngIf="game_details?.timeStamp">{{
            game_details.timeStamp | fbTimestamp
          }}</span>
        </div>
      </div>
    </ng-template>
    <!-- Video Editor -->
    <div
      [ngClass]="{
        hidden: !game_details
      }"
      class="relative z-10 overflow-hidden aspect-video"
    >
      <!-- Video Player -->
      <video
        controls
        #videoPlayer
        crossorigin
        class="video-js vjs-theme-forest mx-auto"
      ></video>
    </div>
  </section>

`;
