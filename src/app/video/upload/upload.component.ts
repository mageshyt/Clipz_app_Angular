import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  images: any[] = [
    '../../assets/img/1.jpg',
    '../../assets/img/2.jpg',
    '../../assets/img/3.jpg',
  ];

  selectedImage: number = 0;
  constructor() {}

  isDrageOver: boolean = false; // it helps to check if the file  hover or not
  ngOnInit(): void {}

  file: File | null = null;

  setThumbnail(index: any) {
    this.selectedImage = index;
  }
  upload() {}
  onDrop(event: any) {
    this.isDrageOver = false;
    this.file = event.dataTransfer.files[0];
    //! only it should be mp4
    if (!this.file || this.file.type !== 'video/mp4') {
      this.file = null;
      return;
    }
    console.log(this.file?.type);
  }
}
