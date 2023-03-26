import { ClipService, IClip } from './../../services/clip.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

export interface Games {
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
export class GameClipsComponent implements OnInit, OnDestroy {
  gameDetails?: IClip[];

  constructor(public clip: ClipService, private router: Router) {
    this.getClips();
  }

  ngOnInit(): void {
    // for infinite scroll
    console.log('on init');
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // only on home page
    if (this.router.url !== '/') return;
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      // !fetch more data

      this.clip.getClips();
    }
  };

  ngOnDestroy() {
    // !remove infinite scroll
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  getClips = async () => {
    const res = await this.clip.getClips();
  };
}
