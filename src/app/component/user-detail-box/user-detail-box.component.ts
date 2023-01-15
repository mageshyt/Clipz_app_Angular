import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-user-detail-box',
  templateUrl: './user-detail-box.component.html',
  styleUrls: ['./user-detail-box.component.scss'],
})
export class UserDetailBoxComponent implements OnInit {
  style: any = {
    reaction_btn:
      'bg-gray-600 disabled:cursor-not-allowed material-symbols-outlined animate_btn  rounded-md p-2',
    subscribe_btn:
      'bg-gray-600 p-2 rounded-md text-white font-semibold animate_btn',
  };
  @Input() owner: any;

  @Input() clip_id!: string;

  @Input() likes: number = 0;

  isLoading: boolean = false;
  avatar: string = '';

  isLiked: boolean = false;

  isUnliked: boolean = false;

  getUserAvatar() {
    this.avatar =
      'https://avatars.dicebear.com/api/pixel-art/' +
      this.owner?.name +
      '.svg;';
  }
  constructor(
    private toast: ToastrService,
    public reactionService: PostService
  ) { }
  ngOnInit(): void {
    this.reactionService.isUserLiked(this.clip_id).then(res => this.isLiked = res)
  }

  like() {
    this.isLoading = true;
    if (this.clip_id)
      this.reactionService.like(this.clip_id).then((res: any) => {
        console.log('res ', res)
        this.isLoading = false;
        if (res !== 'already liked' && res.trim() !== 'not logged in') {
          this.isLiked = true;
          // increment likes
          console.log(" incementing likes ")
          this.likes++;
        }
      });

  }
  unlike() {
    this.isLoading = true;
    if (this.clip_id)
      this.reactionService.unlike(this.clip_id).then((res: any) => {
        if (res !== false) {
          this.isUnliked = false;
          // make is liked false
          this.isLiked = false;
          // decrement likes
          this.likes--;
        }
        this.isLoading = false; // make loading false
      });

  }

  subscribe() {
    console.log(" is liked ", this.reactionService.isUserLiked(this.clip_id))
    // this.reactionService.subscribe();
  }

  share() {
    if (this.clip_id) this.reactionService.share(this.clip_id);
  }
}
