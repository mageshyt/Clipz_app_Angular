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
    this.alertColor = 'blue';
    this.alertMessage = 'Login Successful 🥰';
  }
}
