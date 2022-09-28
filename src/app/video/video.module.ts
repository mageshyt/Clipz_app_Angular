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
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SafeURLPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    ManageComponent,
    VideoCardComponent,
    TopBarComponent,
    UploadComponent,
    EditModalComponent,
    SafeURLPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoRoutingModule,
    ReactiveFormsModule,
    UserModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
})
export class VideoModule {}
