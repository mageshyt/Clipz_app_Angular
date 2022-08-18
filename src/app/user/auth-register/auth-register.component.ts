import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('');
  confirmPassword = new FormControl('');
  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  age = new FormControl('', [Validators.required, Validators.min(18)]);
  registerForm: any = new FormGroup({
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    name: this.name,
    age: this.age,
  });

  constructor() {}

  ngOnInit(): void {
    console.log(this.registerForm);
  }
  onSubmit() {
    console.log(this.registerForm);
  }
}
