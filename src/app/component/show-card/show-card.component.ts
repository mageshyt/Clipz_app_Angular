import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShowType } from 'src/app/services/bookshows.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  providers: [DatePipe],
})
export class ShowCardComponent implements OnInit {
  @Input() show!: ShowType;
  currentUserId: string = '';
  constructor(public auth: AuthService) {
    this.currentUserId = this.auth.currentUser.uid;
  }

  ngOnInit(): void {}
}
