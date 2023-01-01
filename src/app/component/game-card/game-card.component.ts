import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, pipe } from 'rxjs';
import { FbTimestampPipe } from 'src/app/pipes/fb-timestamp.pipe';
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  providers: [DatePipe],
})
export class GameCardComponent implements OnInit {
  @Input() gameTitle?: String;
  @Input() gameImage?: String;
  @Input() UploadedDate?: any;

  @Input() postedBY?: String;

  @Input() gameID?: String;
  constructor(private route: Router, private router: ActivatedRoute) {}

  ngOnInit(): void {}

<<<<<<< HEAD
  onclick(game_title: String | undefined) {
    // console.log(game_title);

    this.route.navigate(['clip', game_title]);
=======
  onclick() {
    if (this.gameID) {
      const id = this.gameID.replace('.mp4', '');
      this.route.navigate(['clip', id]);
    }
>>>>>>> a2aa9eae7236f676aa4f89b98157f375577181e0
  }
}
