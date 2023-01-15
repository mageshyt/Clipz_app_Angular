import { userCollection } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Notyf } from 'notyf';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top',
    },
  });

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    // get currentUser
    this.auth.user.subscribe((user) => {
      this.current_user = user;
    });
  }
  current_user: any;

  public async like(video_id: string) {
    try {
      // get video_likes of the currentUser;
      const { uid } = this.current_user;
      console.log('uid', uid);
      //  get like  map datatype  of the video then add the video id in users
      this.getUserLike(uid).then((videoLikes: any) => {
        console.log('videoLikes', videoLikes);
        //  if video already liked then do nothing
        if (videoLikes[video_id]) {
          this.notyf.error('Already liked ❌');
          return;
        }

        if (videoLikes && !videoLikes[video_id]) {
          // add the key as video id
          videoLikes[video_id] = true;
          console.log('video', videoLikes);
          // update the doc
          this.db
            .collection<userCollection>('users')
            .doc(uid)
            .update({
              video_likes: videoLikes,
            })
            .then(() => {
              this.notyf.success('Liked successfully ✅ ');
            });

          // increment likes of the video
          this.db
            .collection('clips')
            .doc(video_id)
            .update({
              likes: firebase.firestore.FieldValue.increment(1),
            })
            .then(() => console.log('incremented likes'));
        }
      });
    } catch (err) {
      console.log(err);
      this.notyf.error('Something went wrong ❌');
    }
  }

  public async getUserLike(uid: string): Promise<string[]> {
    const video_likes = await this.db
      .collection<userCollection>('users')
      .doc(uid)
      .get()
      .toPromise()
      .then((res: any) => {
        return res.data()?.video_likes;
      })
      .catch((err) => {
        console.log('err', err);
      });

    return video_likes;
  }

  public async unlike(video_id: string) {
    try {
      // get video_likes of the currentUser;
      const { uid } = this.current_user.uid;

      //  get like  map datatype  of the video then add the video id in users
      this.getUserLike(uid).then((videoLikes: any) => {
        //  if video already liked then do nothing
        if (!videoLikes[video_id]) {
          this.notyf.error('Already unliked ❌');
          return;
        }
      });
    } catch (err) {}
  }

  public async isUserLiked(video_id: string): Promise<boolean> {
    try {
      // get video_likes of the currentUser;
      const { uid } = this.current_user.uid;

      const likes = this.getUserLike(uid).then((res: any) => {
        if (res[video_id]) {
          return true;
        }
        return false;
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // share

  public share(video_id: string) {
    // copy to the clip board
    const url = `https://clipr.netlify.app/clip/${video_id}`;
    navigator.clipboard.writeText(url);
    this.notyf.success('Copied to clipboard ✅');
  }

  // subscribe
  public subscribe() {
    this.notyf.error('working on subscribe feature 🏗️');
  }
}
