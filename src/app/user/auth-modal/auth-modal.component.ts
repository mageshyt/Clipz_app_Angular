import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit {
  constructor(private modal: ModalService) {
    // this.modalState = this.modal.isModalOpen('auth');
  }
  ngOnInit(): void {
    console.log('auth modal init');
    this.modal.registerModal('auth');
  }
}
