import { AllShowsComponent } from './all-shows.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCardComponent } from '../show-card/show-card.component';
import { ClipModule } from 'src/app/clip/clip.module';

@NgModule({
  declarations: [AllShowsComponent, ShowCardComponent],
  imports: [CommonModule, ClipModule],
  exports: [AllShowsComponent],
})
export class AllShowsModule {}
