import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthCustomInputComponent } from './auth-custom-input/auth-custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from '../services/auth.service';
@NgModule({
  declarations: [
    AuthModalComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthCustomInputComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
  ],
  exports: [
    AuthModalComponent,
    AuthLoginComponent,
    ReactiveFormsModule,
    AlertComponent,
  ],
  providers: [AuthService],
})
export class UserModule {}
