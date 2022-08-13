import { Component, OnInit } from '@angular/core';
interface Games {
  gameTitle: string;
  gameImage: string;
  UploadedDate: string;
  postedBY: string;
}

@Component({
  selector: 'app-game-clips',
  templateUrl: './game-clips.component.html',
  styleUrls: ['./game-clips.component.scss'],
})
export class GameClipsComponent implements OnInit {
  games: Games[] = [
    {
      gameTitle: 'Counter Strike: Global Offensive',
      UploadedDate: '12-12-2019',
      postedBY: 'Magesh yt',
      gameImage: 'assets/img/1.jpg',
    },
    {
      gameTitle: 'Overwatch',
      UploadedDate: '5-27-2021',
      postedBY: 'Magesh yt 🔥',
      gameImage: 'assets/img/3.jpg',
    },
    {
      gameTitle: "Player Unknown's Battlegrounds",
      UploadedDate: '1-12-2022',
      postedBY: 'Magesh yt',
      gameImage: 'assets/img/2.jpg',
    },
    {
      gameTitle: 'Fortnite :Global Offensive',
      UploadedDate: '1-12-2022',
      postedBY: 'chani yt  🚌',
      gameImage:
        'https://cdn2.unrealengine.com/metaimage1-1920x1080-abb60090deaf.png',
    },
    {
      gameTitle: 'Valorant',
      UploadedDate: '1-12-2022',
      postedBY: 'Lara Magesh 💗',
      gameImage:
        'https://as01.epimg.net/meristation/imagenes/2020/04/20/noticias/1587396399_171528_1587396566_noticia_normal.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
