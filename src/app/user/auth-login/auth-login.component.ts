import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  forgetPasswordForm = {
    email: '',
  };
  forgetPassword = false;
  alertMessage: string = 'Please wait! we are logging you in 😇';
  showAlert: boolean = false;
  alertColor: string = 'blue';
  inSubmission = false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  async onSubmit(f: NgForm) {
    this.inSubmission = true;

    const { email, password } = f.form.value;
    try {
      await this.auth.login({ email, password });
      this.showAlert = true;
    } catch (err) {
      this.alertMessage =
        'An error occured while logging you in 😢, please try again';
      this.showAlert = true;
      this.inSubmission = false;
      this.alertColor = 'red';
      console.log(err);
      return;
    }
    console.log('logged in');
    this.alertColor = 'green';
    this.alertMessage = 'Login Successful 🥰';
  }

  // set forget password to true
  onForgetPasswordClick() {
    this.forgetPassword = true;
  }
  // forget password
  async onForgetPassword(f: NgForm) {
    this.inSubmission = true;
    const { email } = f.form.value;
    console.log(email);
    try {
      await this.auth.forgetPassword(email);
      this.showAlert = true;
    } catch (err) {
      this.alertMessage =
        'An error occured while sending you a reset link 😢, please try again';
      this.showAlert = true;
      this.inSubmission = false;
      this.alertColor = 'red';
      console.log(err);
      return;
    }

    this.alertColor = 'green';
    this.alertMessage = 'Reset link sent to your email 🥰';

    this.forgetPassword = false;

    this.inSubmission = false;
  }
}
