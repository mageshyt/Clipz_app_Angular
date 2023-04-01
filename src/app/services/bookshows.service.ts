import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService, userCollection } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var Razorpay: any;

function _window() {
  // return the global native browser window object
  return window;
}

export type ShowType = {
  id: string;
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
  users: any;
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
    private router: Router,
    private http: HttpClient
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
          doc['id'] = randomFileName;
          doc['users'] = {};

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
  }

  get nativeWindow(): any {
    return _window();
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

  async initPayment(res: any, show: any, bookings: any) {
    const { data } = res;
    console.log(data);
    const options = {
      key: 'rzp_test_hAmYdum4x0n1A7',
      amount: data.amount * 100,

      name: 'BookMyShow',
      description: 'Clipz app',
      describe: 'watch and enjoy your favourite clips',

      order_id: data.id,
      image: 'https://avatars.githubusercontent.com/u/70838644?v=4',

      handler: async (response: any) => {
        try {
          const verifyUrl = 'http://localhost:8000/api/payment/verify';

          const res = this.http
            .post(verifyUrl, response)
            .subscribe((data: any) => {
              if (data.success) {
                this.notify.success('Payment successful');

                const { uid } = this.userAuth.currentUser;
                bookings[uid] = true;
                this.db
                  .collection('shows')
                  .doc(show.id)
                  .update({
                    users: bookings,
                    available: firebase.firestore.FieldValue.increment(-1),
                  });

                this.notify.success('Show booked successfully');

                this.router.navigate(['/']);
              } else {
                this.notify.error('Payment failed');
              }
            });
        } catch (err) {
          console.log(err);
        }
      },

      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new this.nativeWindow.Razorpay(options);

    rzp.open();

    rzp.on('payment.failed', (response: any) => {
      this.notify.error('Payment failed');
    });
  }
  async bookShow(show: any) {
    try {
      const orderUrl = 'http://localhost:8000/api/payment/orders';

      const { uid } = this.userAuth.currentUser;
      //  check its booked or not
      if (show?.users[uid]) {
        this.notify.error('You have already booked this show');
        return;
      }
      console.log(show);
      const res = await this.http
        .post(orderUrl, {
          amount: parseInt(show.price),
        })
        .subscribe((data) => {
          this.initPayment(data, show, show?.users);
          // now add the show to the user's booked shows
        });
    } catch (err) {
      console.log(err);
    }
  }

  // get user Bookings

  async cancelBooking(show: any) {
    const { uid } = this.userAuth.currentUser;
    //  check its booked or not
    if (!show?.users[uid]) {
      this.notify.error('You have not booked this show');
      return;
    }
    delete show.users[uid];

    this.db
      .collection('shows')
      .doc(show.id)
      .update({
        users: show.users,
        available: show.available + 1,
      });

    this.notify.success('Show cancelled successfully');

    this.router.navigate(['/']);
  }
}
