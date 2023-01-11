import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-user-detail-box',
  templateUrl: './user-detail-box.component.html',
  styleUrls: ['./user-detail-box.component.scss'],
})
export class UserDetailBoxComponent implements OnInit {
  style: any = {
    reaction_btn:
      'bg-gray-600 bg cursor-pointer material-symbols-outlined animate_btn  rounded-md p-2',
    subscribe_btn:
      'bg-gray-600 p-2 rounded-md text-white font-semibold animate_btn',
  };

  @Input() owner: any;

  @Input() clip_id?: string;

  avatar: string = '';

  getUserAvatar() {
    this.avatar =
      'https://avatars.dicebear.com/api/pixel-art/' +
      this.owner?.name +
      '.svg;';
  }
  constructor(public reaction: PostService) {}

  ngOnInit(): void {}

  like() {
    if (this.clip_id) this.reaction.like(this.clip_id);
  }
}
