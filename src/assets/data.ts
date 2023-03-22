import { ComponentRef } from '@angular/core';
import { ToastRef } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Games } from 'src/app/component/game-clips/game-clips.component';

export const games: Games[] = [
  {
    gameTitle: 'Counter Strike',
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
    gameTitle: "Player Unknown's",
    UploadedDate: '1-12-2022',
    postedBY: 'Magesh yt',
    gameImage: 'assets/img/2.jpg',
  },
  {
    gameTitle: 'Fortnite :Global Offensive',
    UploadedDate: '1-12-2022',
    postedBY: 'chan yt  🚌',
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
  {
    gameTitle: 'Valorant',
    UploadedDate: '1-12-2022',
    postedBY: 'Lara Magesh 💗',
    gameImage:
      'https://as01.epimg.net/meristation/imagenes/2020/04/20/noticias/1587396399_171528_1587396566_noticia_normal.jpg',
  },
];

export interface ActiveToast {
  /** Your Toast ID. Use this to close it individually */
  toastId: number;
  /** the title of your toast. Stored to prevent duplicates if includeTitleDuplicates set */
  title: string;
  /** the message of your toast. Stored to prevent duplicates */
  message: string;
  /** a reference to the component see portal.ts */
  portal: ComponentRef<any>;
  /** a reference to your toast */
  toastRef: ToastRef<any>;
  /** triggered when toast is active */
  onShown: Observable<any>;
  /** triggered when toast is destroyed */
  onHidden: Observable<any>;
  /** triggered on toast click */
  onTap: Observable<any>;
  /** available for your use in custom toast */
  onAction: Observable<any>;
}
