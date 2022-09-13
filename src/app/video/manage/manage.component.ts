import { Component, OnInit } from '@angular/core';
import { Games } from 'src/app/component/game-clips/game-clips.component';
import { games } from 'src/assets/data';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  gameDetails: Games[] = games;
  constructor() {}

  ngOnInit(): void {}
}
