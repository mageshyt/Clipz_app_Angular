import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { BookshowService, ShowType } from 'src/app/services/bookshows.service';
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
  isAlreadyBooked: boolean = false;

  constructor(public auth: AuthService, public book: BookshowService) {
    this.currentUserId = this.auth.currentUser.uid;
  }

  ngOnInit(): void {
    this.isAlreadyBooked = this.show?.users[this.currentUserId] ? true : false;
  }

  bookShow() {
    this.book.bookShow(this.show);
  }

  cancelBooking() {

    this.book.cancelBooking(this.show);
  }
}
