import { Injectable } from '@angular/core';

interface IModal {
  isOpen: boolean;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  registerModal(id: string) {
    console.log('registering modal', id);
    this.modals.push({
      isOpen: false,
      id,
    });
  }

  toggleModal(id: string): boolean {
    const CurrModal = this.modals.find((modal) => modal.id === id);
    console.log(CurrModal);
    if (CurrModal) {
      CurrModal.isOpen = !CurrModal.isOpen;
    }
    return Boolean(CurrModal?.isOpen);
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find((modal) => modal.id === id)?.isOpen;
  }

  constructor() {}
}
