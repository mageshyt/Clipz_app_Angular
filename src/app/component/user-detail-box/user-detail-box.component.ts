import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-user-detail-box',
  templateUrl: './user-detail-box.component.html',
  styleUrls: ['./user-detail-box.component.scss'],
})
export class UserDetailBoxComponent implements OnInit {
  style: any = {
    reaction_btn:
      'bg-gray-600 disabled:cursor-not-allowed bg cursor-pointer material-symbols-outlined animate_btn  rounded-md p-2',
    subscribe_btn:
      'bg-gray-600 p-2 rounded-md text-white font-semibold animate_btn',
  };
  @Input() owner: any;

  @Input() clip_id?: string;

  isLoading: boolean = false;
  avatar: string = '';

  getUserAvatar() {
    this.avatar =
      'https://avatars.dicebear.com/api/pixel-art/' +
      this.owner?.name +
      '.svg;';
  }
  constructor(
    private toast: ToastrService,
    private reactionService: PostService
  ) {}

  ngOnInit(): void {}

  like() {
    this.isLoading = true;
    if (this.clip_id)
      this.reactionService.like(this.clip_id).then((res) => {
        this.isLoading = false;
      });
  }

  subscribe() {
    this.reactionService.subscribe();
  }

  share() {
    if (this.clip_id) this.reactionService.share(this.clip_id);
  }
}
