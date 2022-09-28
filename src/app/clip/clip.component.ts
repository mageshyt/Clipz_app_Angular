import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';
import { games } from 'src/assets/data';
import { Games } from '../component/game-clips/game-clips.component';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent implements OnInit, DoCheck {
  games_asset: Games[] = games;
  constructor(private route: ActivatedRoute) {}
  game_title: string = '';
  ngOnInit(): void {
    this.game_title = this.route.snapshot.params['id'];
  }
  //! this will check when again route change
  ngDoCheck(): void {
    this.game_title = this.route.snapshot.params['id'];
  }
}
