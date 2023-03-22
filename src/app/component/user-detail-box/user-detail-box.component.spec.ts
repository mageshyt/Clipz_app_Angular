import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailBoxComponent } from './user-detail-box.component';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';

describe('UserDetailBoxComponent', () => {
  let component: UserDetailBoxComponent;
  let fixture: ComponentFixture<UserDetailBoxComponent>;

  let toast: ToastrService;
  let reactionService: PostService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UserDetailBoxComponent],
      providers: [
        {
          provide: ToastrService,
          useValue: toast,
        },
        {
          provide: PostService,
          useValue: reactionService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailBoxComponent);
    component = fixture.componentInstance;
    component.isLiked = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
