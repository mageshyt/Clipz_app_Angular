import { games } from './../../../assets/data';
import { Component, OnInit } from '@angular/core';
export interface Games {
  gameTitle: string;
  gameImage: string;
  UploadedDate: string;
  postedBY: string;
}

@Component({
  selector: 'app-game-clips',
  templateUrl: './game-clips.component.html',
  styleUrls: ['./game-clips.component.scss'],
})
export class GameClipsComponent implements OnInit {
  gameDetails = games;

  constructor() {}

  ngOnInit(): void {}
}
