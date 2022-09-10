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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroComponent,
    GameCardComponent,
    GameClipsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
