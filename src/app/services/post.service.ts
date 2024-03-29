import { AuthService, userCollection } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Notyf } from 'notyf';
import { environment } from 'src/environments/environment';
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

  constructor(
    private db: AngularFirestore,
    private auth_service: AuthService
  ) {}

  public async like(video_id: string) {
    try {
      // if user is not logged in then return
      console.log('coming ', this.auth_service.currentUser);
      if (!this.auth_service.currentUser) {
        this.notyf.error('Please login to like ❌');
        return 'not logged in';
      }

      // get video_likes of the currentUser;
      const { uid } = this.auth_service.currentUser;

      //  get like  map datatype  of the video then add the video id in users
      return this.getUserLike(uid).then((videoLikes: any): any => {
        //  if video already liked then do nothing
        if (videoLikes[video_id]) {
          this.notyf.error('Already liked ❌');
          return 'already liked';
        }
        console.log('coming');

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
      if (!this.auth_service.currentUser) {
        this.notyf.error('Please login to like ❌');
        return 'not logged in';
      }

      const { uid } = this.auth_service.currentUser;

      //  get like  map datatype  of the video then add the video id in users
      return this.getUserLike(uid).then((videoLikes: any): any => {
        //  if video already liked then do nothing
        if (videoLikes[video_id]) {
          // make it false
          videoLikes[video_id] = false;
          // update the doc
          return this.db
            .collection<userCollection>('users')
            .doc(uid)
            .update({
              video_likes: videoLikes,
            })
            .then(() => {
              this.notyf.success('Unliked successfully ✅ ');

              // decrement likes of the video
              this.db
                .collection('clips')
                .doc(video_id)
                .update({
                  likes: firebase.firestore.FieldValue.increment(-1),
                });
              return 'unliked';
            });
        } else {
          this.notyf.error('Already unliked ❌');
          return 'already unliked';
        }
      });
    } catch (err) {
      console.log(err);
      this.notyf.error('Something went wrong ❌');
      return 'something went wrong';
    }
  }

  public async isUserLiked(video_id: string) {
    try {
      if (!this.auth_service.currentUser) {
        this.notyf.error('Please login to like ❌');
        return false;
      }
      // get video_likes of the currentUser;
      const { uid } = this.auth_service.currentUser;

      //  get like  map datatype  of the video then add the video id in users

      return this.getUserLike(uid).then((videoLikes: any) => {
        //  if video already liked then do nothing
        if (videoLikes[video_id]) {
          console.log('returning true');
          return true;
        }
        return false;
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // share

  public share(video_id: string) {
    // copy to the clip board
    const url = `${environment.BaseUrl}/clip/${video_id}`;
    navigator.clipboard.writeText(url);
    console.log('copied to clipboard');

    this.notyf.success('Copied to clipboard ✅');
  }

  // subscribe
  public subscribe() {
    try {
      if (!this.auth_service.currentUser) {
        this.notyf.error('Please login to subscribe ❌');
      }
      this.notyf.success('Subscribed successfully ✅');
    } catch (err) {
      console.log(err);
      this.notyf.error('Something went wrong ❌');
    }
  }
}
