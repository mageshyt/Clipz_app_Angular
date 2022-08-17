import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthCustomInputComponent } from './auth-custom-input/auth-custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthModalComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthCustomInputComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [AuthModalComponent, AuthLoginComponent, ReactiveFormsModule],
})
export class UserModule {}
