import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';

interface userDoc {
  email: string;
  name: string;
  age: number;
  phoneNumber: string;
  password: string;
}

interface userLogin {
  email: string;
  password: string;
}

export interface userCollection {
  email: string;
  name: string;
  age: number;
  phone: string;
  video_likes: Object;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$!: Observable<boolean>;
  public isAuthenticatedWithDelay$!: Observable<boolean>;
  private redirect: boolean = false;
  public currentUser: any;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        console.log('User is logged in', user);
      } else {
        console.log('User is not logged in');
      }
    });

    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = auth.user.pipe(
      delay(1000),
      map((user) => !!user)
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),

        map((e) => this.route.firstChild),
        //! get the data from the route
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data: any) => {
        this.redirect = data.authOnly ?? false;
      });
  }

  public async createUser(data: userDoc) {
    const user: any = await this.auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    // ! if user is created then only add data to firestore
    await this.db.collection<userCollection>('users').doc(user.user.uid).set({
      email: data.email,
      name: data.name,
      age: data.age,
      phone: data.phoneNumber,

      video_likes: {},
    });

    //! update the user profile with name
    return await user.user.updateProfile({
      displayName: data.name,
    });
  }
  //! login
  public async login(data: userLogin) {
    await this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  //! signOut
  public async signOut<Observable>() {
    // ! if you want to redirect to a page after signOut
    return await this.auth.signOut().then(() => {
      this.router.navigateByUrl('/');
    });
  }

  // ! forget password
  public async forgetPassword(email: string) {
    return await this.auth.sendPasswordResetEmail(email);
  }
}
