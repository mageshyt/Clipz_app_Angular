import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
export interface IClip {
  uid: string;
  title: string;
  displayName: string;
  url: string;
  timeStamp: firebase.firestore.FieldValue;
  fileName: string;
  thumbnail: string;
  screen_short_name: string;
  docID?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClipService implements Resolve<IClip | null> {
  pageClips: IClip[] = [];
  pendingRequest = false;

  public clipsCollection: AngularFirestoreCollection<IClip | null>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private userAuth: AuthService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.clipsCollection = db.collection('clips');
  }
  createClip = async (data: IClip) => {
    const docId = data.fileName.replace('.mp4', '');
    return this.clipsCollection.doc(docId).set(data);
  };
  //! function to get all the clips from firebase
  public get_user_Clips = async (): Promise<IClip[]> => {
    const currentUser = await this.userAuth.currentUser;

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

  //! delete clip

  public deleteClip = async (clip: IClip) => {
    const res1 = this.clipsCollection.ref
      .where('fileName', '==', clip.fileName)
      .get()
      .then((data) => {
        data.docs[0].ref.delete().then(() => console.log('deleted'));
      });
    const res2 = this.storage.ref(`clips/${clip.fileName}`).delete();
    const res3 = this.storage
      .ref(`thumbnails/${clip.screen_short_name}`)
      .delete();

    return Promise.all([res1, res2, res3]);
  };

  //! get video link
  public async getVideoDetail(video_id: string) {
    const query = await this.clipsCollection.ref.doc(video_id).get();
    const data = query.data() as IClip;
 
    return  data;
  }

  // ! get clips
  public async getClips() {
    if (this.pendingRequest) return;
    this.pendingRequest = true;

    let query = this.clipsCollection.ref.orderBy('timeStamp', 'desc').limit(6);
    const { length } = this.pageClips;
    if (length) {
      console.log('last doc id', this.pageClips);

      const last_doc_id = this.pageClips[length - 1].fileName.replace(
        '.mp4',
        ''
      );
      const last_doc = await this.clipsCollection
        .doc(last_doc_id)
        .get()
        .toPromise();
      query = query.startAfter(last_doc); // start After
    }
    const data = await query.get();
    const clips = data.docs.map((doc) => doc.data() as IClip);
    this.pageClips = [...this.pageClips, ...clips];
    console.log('page clips', this.pageClips[0].docID);
    this.pendingRequest = false;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.clipsCollection
      .doc(id as string)
      .get()
      .pipe(
        map((snapshot) => {
          const data = snapshot.data();

          if (!data) {
            this.router.navigate(['/']);
            return null;
          }

          return data;
        })
      );
  }

  // function to get user detail by uid
  public async getUserDetail(uid: string) {
    const query = await this.db.collection('users').ref.doc(uid).get();
    const data = query.data();
    return data;
  }
  
}
