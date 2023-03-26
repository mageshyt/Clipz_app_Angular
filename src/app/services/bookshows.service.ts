import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';

export type ShowType = {
  Title: string;
  price: number;
  description: string;
  date: any;
  time: any;
  thumbnail: File | string;
  category: string;
  timeStamp: firebase.firestore.FieldValue;
  available: number;
  creator: string;
};
@Injectable({
  providedIn: 'root',
})
export class BookshowService {
 

  public ShowCollection: AngularFirestoreCollection<ShowType | null>;
  notify = new Notyf({
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });
  shows: ShowType[] = [];
  pendingRequest = false;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private userAuth: AuthService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.ShowCollection = db.collection('shows');
  }

  async AddShow(doc: any) {
    if (this.pendingRequest) return;
    this.pendingRequest = true;

    const randomFileName = uuidv4();

    const thubmnail_path = `thumbnails/${randomFileName}.jpg`;
    const thubmnail_short_ref = this.storage.ref(thubmnail_path);

    return this.storage
      .upload(thubmnail_path, doc.thumbnail)
      .then((snapshot) => {
        // get url of the thumbnail
        thubmnail_short_ref.getDownloadURL().subscribe((url) => {
          doc['thumbnail'] = url;

          const res = this.ShowCollection.doc(randomFileName)
            .set(doc)
            .then(() => {
              this.notify.success('Show added successfully');
            });
          // add the show to the shows array
          this.shows.push(doc);

          this.pendingRequest = false;
        });
      });

    return;
  }

  async getShows() {
    if (this.pendingRequest) return;
    this.pendingRequest = true;
    // get all shows
    let query = this.ShowCollection.ref.orderBy('timeStamp', 'desc').limit(6);

    const data = await query.get();
    const shows = data.docs.map((doc) => doc.data() as ShowType);
    console.log(shows);
    this.shows = shows;
    this.pendingRequest = false;
    return shows;
  }
}
