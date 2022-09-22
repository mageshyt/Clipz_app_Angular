import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModule } from '../user/user.module';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    ManageComponent,
    VideoCardComponent,
    TopBarComponent,
    UploadComponent,
    EditModalComponent,
  ],
  imports: [CommonModule, SharedModule, VideoRoutingModule,ReactiveFormsModule,UserModule],
})
export class VideoModule {}
