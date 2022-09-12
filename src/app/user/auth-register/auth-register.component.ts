import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';
@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent {
  email = new FormControl(
    '',
    [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ],
    [this.emailTaken.validate]
  );

  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  age = new FormControl('', [Validators.required, Validators.min(18)]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  registerForm: any = new FormGroup(
    {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      name: this.name,
      age: this.age,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.checkPasswordMatch('password', 'confirmPassword')]
  );

  alertMessage: string = '';
  showAlert: boolean = false;
  alertColor: string = 'blue';

  ngOnInit(): void {}

  checkPasswordMatch(password: string, confirmPassword: string): boolean {
    if (password === confirmPassword) {
      console.log(this.registerForm.value);
      return true;
    } else {
      this.alertMessage = 'Password and Confirm Password does not match';
      this.showAlert = true;
      this.alertColor = 'red';
    }
    return false;
  }

  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}
  loading: boolean = false;
  async onSubmit() {
    this.loading = true;
    this.alertMessage = 'Please Wait , We are Registering You';
    this.showAlert = true;
    this.alertColor = 'blue';
    if (this.registerForm.valid) {
      //! if password and confirm password matches then only register
      if (
        this.checkPasswordMatch(
          this.registerForm.value.password,
          this.registerForm.value.confirmPassword
        )
      ) {
        try {
          const { email, password, name, age, phoneNumber } =
            this.registerForm.value;
          const res = this.auth.createUser({
            email,
            password,
            name,
            age,
            phoneNumber,
          });
          console.log(res);

          this.alertMessage = 'Registration Successful';
          this.showAlert = true;
          this.alertColor = 'green';
        } catch (err) {
          console.log('error', err);
          this.alertMessage = 'Registration Failed';
          this.showAlert = true;
          this.alertColor = 'red';
        }
      }
    }

    this.loading = false;
  }
}
