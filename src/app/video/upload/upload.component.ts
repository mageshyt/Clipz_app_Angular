import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { last, switchMap } from 'rxjs/operators';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnDestroy {
  images: any[] = [
    '../../assets/img/1.jpg',
    '../../assets/img/2.jpg',
    '../../assets/img/3.jpg',
  ];
  task?: AngularFireUploadTask;
  selectedImage: number = 0;
  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private clip_service: ClipService,
    private route: Router
  ) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }
  isDrageOver: boolean = false; // it helps to check if the file  hover or not

  //! current user
  user: any;
  ngOnDestroy(): void {
    //! cancel the upload when the component is destroyed
    console.log('component destroyed');
    if (this.task) {
      this.task.cancel();
    }
  }

  file: File | null = null;

  setThumbnail(index: any) {
    this.selectedImage = index;
  }

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)],
    nonNullable: true,
  });

  uploadForm: any = new FormGroup({
    title: this.title,
  });

  //! for alert component
  alert: any = {
    show: false,
    message: '',
    alertColor: '',
  };
  submitting: boolean = false;

  //! current user

  //! method to upload the file
  upload() {
    //! disable the form
    this.uploadForm.disable();
    this.submitting = true;
    this.alert.show = true;
    this.alert.message = 'Please wait! we are uploading your video 😇';
    this.alert.alertColor = 'blue';

    if (!this.file) {
      return;
    }
    const randomFileName = uuidv4();
    const clipPath = `clips/${randomFileName}.mp4`;

    console.log(clipPath, this.file);
    this.task = this.storage.upload(clipPath, this.file); //! upload the file to firebase storage
    const clipRef = this.storage.ref(clipPath);

    //! percentage of the file uploaded
    this.task.percentageChanges().subscribe((percentage) => {
      if (percentage) {
        this.alert.message = `Please wait! we are uploading your video ${Math.floor(
          percentage
        )}% 😇`;
      }
    });
    //! download url of the file

    this.task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: (url) => {
          const uploadDoc = {
            uid: this.user.uid,
            displayName: this.user.displayName,
            title: this.title.value,
            fileName: `${randomFileName}.mp4`,
            url,
          };
          //! create the doc
          this.clip_service.createClip(uploadDoc).then(() => {
            //! update the info in the firebase database
            this.alert.message = 'Video uploaded successfully 🥰';
            this.submitting = false;
            this.alert.alertColor = 'green';
          });
          this.route.navigate(['/', 'manage']);
        },
        error: (error) => {
          this.uploadForm.enable();
          console.log(error);
          this.alert.show = true;
          this.alert.message = 'Something went wrong 😔';
          this.alert.alertColor = 'red';
        },
      });
  }

  onDrop(event: any) {
    this.isDrageOver = false;
    this.file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    //! only it should be mp4
    console.log(this.file);
    if (!this.file || this.file.type !== 'video/mp4') {
      this.file = null;
      return;
    }
    this.title.setValue(this.file.name.replace('.mp4', ''));
  }
}
