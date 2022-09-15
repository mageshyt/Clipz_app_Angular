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

  ngOnInit(): void {}

  setThumbnail(index: any) {
    this.selectedImage = index;
  }
  upload(){}
}
