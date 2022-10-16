import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipComponent } from './clip/clip.component';
import { AboutComponent } from './component/about/about.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClipService } from './services/clip.service';
import { ManageComponent } from './video/manage/manage.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'clip/:id',
    component: ClipComponent,
    resolve: {
      clip: ClipService,
    },
    //! lazy load for clip component
    loadChildren: () => import('./clip/clip.module').then((m) => m.ClipModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./video/video.module').then((m) => m.VideoModule),
  },

  {
    //! wildcard route
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
