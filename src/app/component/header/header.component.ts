import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private modal: ModalService) {}

  ngOnInit(): void {}
  showAuthModal() {
    this.modal.toggleModal('auth');
  }
}
