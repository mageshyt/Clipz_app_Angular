import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { games } from 'src/assets/data';
import { Games } from '../component/game-clips/game-clips.component';
import { ClipService } from '../services/clip.service';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent implements OnInit, DoCheck {
  games_asset: Games[] = games;
  constructor(private route: ActivatedRoute,private clip:ClipService) {}
    game_title: string = '';
  video_link: string = '';
  ngOnInit(): void {
    this.game_title = this.route.snapshot.params['id'];
    this.clip.getVideoDetail(this.game_title)

  }
  //! this will check when again route change
  ngDoCheck(): void {
    this.game_title = this.route.snapshot.params['id'];
  }
}
