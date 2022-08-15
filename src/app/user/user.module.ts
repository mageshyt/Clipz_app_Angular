import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import {  AuthLoginComponent } from './auth-login/auth-login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthCustomInputComponent } from './auth-custom-input/auth-custom-input.component';

@NgModule({
  declarations: [AuthModalComponent, AuthLoginComponent, AuthRegisterComponent, AuthCustomInputComponent],
  imports: [CommonModule, SharedModule],
  exports: [AuthModalComponent, AuthLoginComponent],
})
export class UserModule {}
