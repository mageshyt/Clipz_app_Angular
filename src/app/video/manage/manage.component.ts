import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit, OnChanges } from '@angular/core';
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
  gameDetails: IClip[] = [];
  sort$?: BehaviorSubject<string>;

  videoOrder: string = '1';
  constructor(
    private route: ActivatedRoute,
    private clip: ClipService,
    private modal: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
    console.log(this.sort$);
    this.sort$.subscribe((data) => {
      console.log(data);
    });
    this.sort$.next('test');
  }

  ngOnInit(): void {
    const res = this.clip.get_user_Clips().then((data) => {
      this.gameDetails = data;
    });
  }

  activeClip: IClip | undefined;
  openModal($clip: IClip) {
    this.modal.toggleModal('video');
    this.activeClip = $clip;
  }
  onDelete($clip: IClip) {
    this.gameDetails = this.gameDetails.filter((clip: IClip) => {
      return clip.fileName !== $clip.fileName;
    });
  }
}
