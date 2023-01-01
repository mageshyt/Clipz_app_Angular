import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private modal: ModalService, public auth: AuthService) {
    this.auth.isAuthenticated$.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }

  ngOnInit(): void {}
  showAuthModal() {
    console.log('showAuthModal');
    const res = this.modal.toggleModal('auth');
  }
  async logout($event: Event) {
    if ($event) {
      $event.preventDefault();
    }
    await this.auth.signOut();
  }
}
