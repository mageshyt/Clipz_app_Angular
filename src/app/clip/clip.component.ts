import { ActivatedRoute } from '@angular/router';
import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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


  game_id: string = '';
  game_details: any;

  clip_user!: any;
  // ! player
  player?: videojs.Player;

  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  constructor(private route: ActivatedRoute, public clip: ClipService) {
    this.game_id = this.route.snapshot.params['id'];

    this.getClips();


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
  getClips = async () => {
    const res = await this.clip.getClips();

  };
  //! this will check when again route change
  ngDoCheck(): void { }
}
