import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BookshowService } from 'src/app/services/bookshows.service';

@Component({
  selector: 'app-all-shows',
  templateUrl: './all-shows.component.html',
  styleUrls: ['./all-shows.component.scss'],
})
export class AllShowsComponent implements OnInit {
  constructor(public showsService: BookshowService, public router: Router) {
    this.showsService.getShows();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    // only on bookShow
    if (this.router.url !== '/bookShow') return;
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      // !fetch more data
      console.log('fetch more data');
      this.showsService.getShows();
    }
  };
  ngOnDestroy() {
    // !remove infinite scroll
    window.removeEventListener('scroll', this.handleScroll, true);
  }
}
