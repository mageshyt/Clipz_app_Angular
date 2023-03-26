import { ModalService } from 'src/app/services/modal.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookshowService } from '../services/bookshows.service';

@Component({
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.scss'],
})
export class BookShowComponent implements OnInit {
  name: any;
  constructor(public modal: ModalService, public auth: AuthService) {
    this.modal.registerModal('bookShowModal');
    
  }

  ngOnInit(): void {}

  bookShow() {
    this.modal.toggleModal('bookShowModal');
  }
}
