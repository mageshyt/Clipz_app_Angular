import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-detail-box',
  templateUrl: './user-detail-box.component.html',
  styleUrls: ['./user-detail-box.component.scss'],
})
export class UserDetailBoxComponent implements OnInit {
  @Input() owner: any;

  avatar: string = '';

  getUserAvatar() {
    
   this.avatar=
      'https://avatars.dicebear.com/api/pixel-art/' + this.owner?.name + '.svg;'
  }
  constructor() {}

  ngOnInit(): void {}
}
