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
    this.modals.push({
      isOpen: true,
      id,
    });
  }

  toggleModal(id: string): boolean {
    console.log('modal 👨‍👩‍👧', this.modals);
    const CurrModal = this.modals.find((modal) => modal.id === id);
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
