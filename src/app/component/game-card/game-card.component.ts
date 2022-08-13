import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() gameTitle?: String;
  @Input() gameImage?: String;
  @Input() UploadedDate?: any;

  @Input() postedBY?: String;
  gameDay?: Date;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.gameDay, new Date(this.UploadedDate));
    this.gameDay = new Date(this.UploadedDate);
  }
}
