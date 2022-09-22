import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

export interface IClip {
  uid: string;
  title: string;
  displayName: string;
  url: string;
  timeStamp: firebase.firestore.FieldValue;
  fileName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip | null>;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private userAuth: AuthService
  ) {
    this.clipsCollection = db.collection('clips');
  }
  createClip = async (data: IClip) => {
    return this.clipsCollection.add(data);
  };
  //! function to get all the clips from firebase
  public getClips = async (): Promise<IClip[]> => {
    const currentUser = await this.userAuth.currentUser;
    console.log('current user', currentUser.uid);
    const query = await this.clipsCollection.ref
      .where('uid', '==', currentUser.uid)
      .get();
    const data = query.docs.map((doc) => doc.data() as IClip);
    return data;
  };

  //! function ot update the name
  public updateClip = async (newTitle: string, cipId: string) => {
    console.log('update clip', newTitle, cipId);
    return this.clipsCollection.ref
      .where('fileName', '==', cipId)
      .get()
      .then((data) => {
        data.docs[0].ref.update({
          title: newTitle,
        });
      });
  };
}
