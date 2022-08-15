import { Component, Input, OnInit, Output, DoCheck } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, DoCheck {
  @Input() modalId: string = '';

  constructor(private modal: ModalService) {}

  isOpen: boolean = false;
  close() {
    this.modal.toggleModal(this.modalId);
  }

  ngDoCheck(): void {
    this.isOpen = this.modal.isModalOpen(this.modalId);
  }
  ngOnInit(): void {
    this.isOpen = this.modal.isModalOpen(this.modalId);
  }
}
