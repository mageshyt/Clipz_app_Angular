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
import { VideoModule } from './video/video.module';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import firebase from 'firebase/compat';

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
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    VideoModule,
    AppRoutingModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
