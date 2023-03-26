import { BookShowComponent } from './book-show.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomInputModule } from '../component/custom-input/custom-input.module';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { AllShowsModule } from '../component/all-shows/all-shows.module';

@NgModule({
  declarations: [
    BookShowComponent,
    UploadFormComponent,
    UploadImageComponent,
 
  ],
  imports: [CommonModule, SharedModule, CustomInputModule, ReactiveFormsModule, AllShowsModule],
  exports: [BookShowComponent],
})
export class BookShowModule {}
