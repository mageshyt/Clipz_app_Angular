import { FfmpegService } from './../../services/ffmpeg.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { last, switchMap } from 'rxjs/operators';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { combineLatest, forkJoin } from 'rxjs';

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
    private route: Router,
    public FfmpegService: FfmpegService
  ) {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
    console.log('ffmpeg loaded');
    this.FfmpegService.load();
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
  async upload() {
    //! disable the form
    this.uploadForm.disable();
    this.submitting = true;
    this.alert.show = true;
    this.alert.message = 'Please wait! we are uploading your video 😇';
    this.alert.alertColor = 'pink';

    if (!this.file) {
      return;
    }

    const randomFileName = uuidv4();
    const clipPath = `clips/${randomFileName}.mp4`;
    this.task = this.storage.upload(clipPath, this.file); //! upload the file to firebase storage
    const clipRef = this.storage.ref(clipPath);

    const screen_short = await this.FfmpegService.blobFromUrl(
      this.images[this.selectedImage]
    );
    const screen_short_path = `thumbnails/${randomFileName}.jpg`;
    const screen_short_ref = this.storage.ref(screen_short_path);

    const screen_short_task = this.storage.upload(
      screen_short_path,
      screen_short
    );

    //! percentage of the file uploaded
    combineLatest(
      this.task.percentageChanges(),
      screen_short_task.percentageChanges()
    ).subscribe((percentage) => {
      const [clip_percentage, screen_short_percentage] = percentage;
      if (clip_percentage && screen_short_percentage)
        if (percentage) {
          this.alert.message = `Please wait! we are uploading your video ${Math.floor(
            clip_percentage + screen_short_percentage / 200
          )}% 😇`;
        }
    });
    //! download url of the file

    forkJoin([this.task.snapshotChanges(), screen_short_task.snapshotChanges()])
      .pipe(
        last(),
        switchMap(() =>
          forkJoin([
            clipRef.getDownloadURL(),
            screen_short_ref.getDownloadURL(),
          ])
        )
      )
      .subscribe({
        next: async (urls) => {
          const [clip_url, screen_short_url] = urls;
          const uploadDoc = {
            uid: this.user.uid,
            displayName: this.user.displayName,
            title: this.title.value,
            fileName: `${randomFileName}.mp4`,
            url: clip_url,
            thumbnail: screen_short_url,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            screen_short_name: `${randomFileName}.jpg`,
          };
          //! create the doc
          const res: any = await this.clip_service
            .createClip(uploadDoc)
            .then((res: any) => {
              const docId = uploadDoc.fileName.replace('.mp4', '');
              //! update the info in the firebase database
              this.alert.message = 'Video uploaded successfully 🥰';
              this.submitting = false;
              this.alert.alertColor = 'green';
              setTimeout(() => {
                this.route.navigate(['/', 'clip', docId]);
              }, 1000);
            });
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

  async onDrop(event: any) {
    this.isDrageOver = false;
    this.file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    //! only it should be mp4
    if (!this.file || this.file.type !== 'video/mp4') {
      this.file = null;
      return;
    }
    const screen_short = await this.FfmpegService.getScreenshot(this.file);
    this.images = screen_short;

    this.title.setValue(this.file.name.replace('.mp4', ''));
  }
}
