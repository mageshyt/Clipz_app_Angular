import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  videoOrder: string = '1';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(({ params }: any) => {
      this.videoOrder = params.sort === '2' ? params.sort : '1';
      
    });
  }

  sort(event: Event) {
    const { value } = event?.target as HTMLInputElement;
    //! method one
    // this.router.navigateByUrl(`/manage?sort=${value}`);
    //! method two
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: value },
    });
    
  }
}
