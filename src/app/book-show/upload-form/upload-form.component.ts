import { AuthService } from 'src/app/services/auth.service';
import { BookshowService } from './../../services/bookshows.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
  loading: boolean = false;
  ShowForm = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  files: any[] = [];
  constructor(
    public upload: BookshowService,
    public modal: ModalService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.ShowForm.disable();
    // get the image file

    const doc = {
      ...this.ShowForm.value,
      thumbnail: this.files[0],
      creator: this.auth.currentUser?.uid,
    };

    this.upload.AddShow(doc).then((res) => {
      this.ShowForm.enable();
      this.loading = false;
      this.ShowForm.reset();
      this.files = [];

      this.modal.toggleModal('bookShowModal');
    });
  }
}
