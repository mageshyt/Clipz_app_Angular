import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbTimestampPipe } from '../pipes/fb-timestamp.pipe';

@NgModule({
  declarations: [FbTimestampPipe],
  imports: [CommonModule],
  exports: [FbTimestampPipe],
})
export class ClipModule {}
