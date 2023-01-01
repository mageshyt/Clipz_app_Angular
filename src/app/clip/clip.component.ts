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
<<<<<<< HEAD
import { ClipService } from '../services/clip.service';

=======
import { ClipService, IClip } from '../services/clip.service';
import { DatePipe } from '@angular/common';
import videojs from 'video.js';
>>>>>>> a2aa9eae7236f676aa4f89b98157f375577181e0
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent implements OnInit, DoCheck {
<<<<<<< HEAD
  games_asset: Games[] = games;
  constructor(private route: ActivatedRoute,private clip:ClipService) {}
    game_title: string = '';
  video_link: string = '';
  ngOnInit(): void {
    this.game_title = this.route.snapshot.params['id'];
    this.clip.getVideoDetail(this.game_title)

=======
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
    // this.clip.getVideoDetail(this.game_id).then((data) => {
    //   this.game_details = data;
    //   this.player?.src({
    //     src: this.game_details.url,
    //   });
    // });

    this.route.data.subscribe((data) => {
      this.game_details = data['clip'];
      this.player?.src({
        src: this.game_details.url,
      });
    });
>>>>>>> a2aa9eae7236f676aa4f89b98157f375577181e0
  }

  //! this will check when again route change
  ngDoCheck(): void {}
}
