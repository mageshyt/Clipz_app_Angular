import { ActivatedRoute } from '@angular/router';
import {
  AfterContentInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { games } from 'src/assets/data';
import { Games } from '../component/game-clips/game-clips.component';
import { ClipService, IClip } from '../services/clip.service';
import { DatePipe } from '@angular/common';
import videojs from 'video.js';
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

  // ! player
  player?: videojs.Player;

  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  constructor(private route: ActivatedRoute, private clip: ClipService) {
    this.game_id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    console.log('clip component');
    this.game_id = this.route.snapshot.params['id'];
    this.player = videojs(this.target?.nativeElement);
    this.clip.getVideoDetail(this.game_id).then((data) => {
      this.game_details = data;
      this.player?.src({
        src: this.game_details.url,
      });
    });
  }

  //! this will check when again route change
  ngDoCheck(): void {}
}
