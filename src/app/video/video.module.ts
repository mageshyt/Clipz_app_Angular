import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { TopBarComponent } from './top-bar/top-bar.component';


@NgModule({
  declarations: [
    ManageComponent,
    VideoCardComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule
  ]
})
export class VideoModule { }
