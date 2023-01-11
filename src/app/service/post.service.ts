import { userCollection } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    // get currentUser
    this.auth.user.subscribe((user) => {
      this.current_user = user;
    });
  }
  current_user: any;


  public async like(video_id: string) {

    // get video_likes of the currentUser;
    const uid = 'Jv0RmJbo9LP5sOGoC0sEmBMzeyK2';

    // get video_likes of the currentUser then add video_id to it;

    const video_likes: any = await this.db
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


    // ! check if user already liked or not
    if (video_likes ) {

      if (video_likes?.includes(video_id)) {
        console.log('already liked');
      } else {
        console.log('not liked');

        // add video_id to video_likes
        await this.db
          .collection<userCollection>('users')
          .doc(uid)
          .update({
            video_likes: [...video_likes, video_id],
          })
          .then(() => {
            console.log('Liked successfully ✅ ');
          });

        // increment likes of the video
        const video=this.db.collection('clips').doc(video_id).update({
          likes: firebase.firestore.FieldValue.increment(1)

        }).then(()=>console.log("incremented likes"))


      }
    }else{
      console.log("video likes is null", video_likes)
    }
        console.log(video_id);
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
}
