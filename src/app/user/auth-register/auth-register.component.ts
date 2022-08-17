import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent {
  email = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  name = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  registerForm: any = new FormGroup({
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    name: this.name,
  });

  constructor() {}

  ngOnInit(): void {
    console.log(this.registerForm);
  }
  onSubmit() {
    console.log(this.registerForm);
  }
}
