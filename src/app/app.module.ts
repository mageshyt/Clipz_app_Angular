import { AllShowsModule } from './component/all-shows/all-shows.module';
import { BookShowModule } from './book-show/book-show.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { IntroComponent } from './component/intro/intro.component';
import { GameCardComponent } from './component/game-card/game-card.component';
import { GameClipsComponent } from './component/game-clips/game-clips.component';
import { UserModule } from './user/user.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

import { UserDetailBoxComponent } from './component/user-detail-box/user-detail-box.component';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipModule } from './clip/clip.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroComponent,
    GameCardComponent,
    GameClipsComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent,
    UserDetailBoxComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({}),
    HttpClientModule,
    ToastContainerModule,
    BookShowModule,
    AllShowsModule,
    ClipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
