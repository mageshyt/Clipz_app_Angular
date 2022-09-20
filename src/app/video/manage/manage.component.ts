import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Games } from 'src/app/component/game-clips/game-clips.component';
import { ClipService } from 'src/app/services/clip.service';
import { games } from 'src/assets/data';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  gameDetails:any = games;

  constructor(private route: ActivatedRoute, private clip: ClipService) {}

  ngOnInit(): void {
    const res = this.clip.getClips().then((data) => {
      this.gameDetails = data;
      
    });
  }
}
