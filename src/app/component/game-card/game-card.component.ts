import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, pipe } from 'rxjs';
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

  constructor(private route: Router, private router: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log(this.gameDay, new Date(this.UploadedDate));
    // this.gameDay = new Date(this.UploadedDate);
  }

  onclick(game_title: String | undefined) {
    // console.log(game_title);

    this.route.navigate(['clip', game_title]);
  }
}
