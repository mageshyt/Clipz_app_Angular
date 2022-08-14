import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthInputsComponent } from './auth-inputs/auth-inputs.component';

@NgModule({
  declarations: [AuthButtonsComponent, AuthModalComponent, AuthInputsComponent],
  imports: [CommonModule],
  exports: [AuthButtonsComponent, AuthModalComponent, AuthInputsComponent],
})
export class UserModule {}
