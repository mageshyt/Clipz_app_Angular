import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  @Input() files: any[] = [];

  isDrageOver: boolean = false; // it helps to check if the file  hover or not
  async onDrop(event: any) {
    this.isDrageOver = false;
    const currentFile = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    // if file present then create img url
    if (currentFile) {
      const reader = new FileReader();
      reader.onload = (e) => (
        (currentFile['url'] = reader.result as string),
        this.files.push(currentFile)
      );
      reader.readAsDataURL(currentFile);
    }
  }

  removeImage(file: any) {
    const index = this.files.indexOf(file);
    this.files.splice(index, 1);
    console.log(this.files);
  }
  constructor() {}

  ngOnInit(): void {}
}
