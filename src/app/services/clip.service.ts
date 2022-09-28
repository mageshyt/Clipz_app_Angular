import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

interface IClip {
  uid: string;
  title: string;
  displayName: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip>;
  constructor(private dp: AngularFirestore) {
    this.clipsCollection = this.dp.collection('clips');
  }

  createClip = async (data: IClip) => {
    await this.clipsCollection.add(data);
    
  };
}
