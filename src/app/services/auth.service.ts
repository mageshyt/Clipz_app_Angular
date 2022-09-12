import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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

interface userCollection {
  email: string;
  name: string;
  age: number;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$!: Observable<boolean>;
  public isAuthenticatedWithDelay$!: Observable<boolean>;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    auth.user.subscribe((user) => {
      if (user) {
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
    return await this.auth.signOut();
  }
}
