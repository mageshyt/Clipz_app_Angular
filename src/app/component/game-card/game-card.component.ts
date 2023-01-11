import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FbTimestampPipe } from '../../pipes/fb-timestamp.pipe';
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
  constructor(private route: Router) {}

  ngOnInit(): void {}

  onclick() {
    if (this.gameID) {
      const id = this.gameID.replace('.mp4', '');
      this.route.navigate(['clip', id]);
    }
  }
}
