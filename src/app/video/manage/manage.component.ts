import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Games } from 'src/app/component/game-clips/game-clips.component';
import { ClipService, IClip } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
import { games } from 'src/assets/data';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  gameDetails: any = games;
  sort$?: BehaviorSubject<string>;

  videoOrder: string = '1';
  constructor(
    private route: ActivatedRoute,
    private clip: ClipService,
    private modal: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);

    this.sort$.subscribe(console.log as any);
    this.sort$.next('test');
  }

  ngOnInit(): void {
    const res = this.clip.getClips().then((data) => {
      this.gameDetails = data;

      console.log(data);
    });
  }
  activeClip: IClip | undefined;
  openModal($clip: IClip) {
    this.modal.toggleModal('video');
    this.activeClip = $clip;
  }
}
