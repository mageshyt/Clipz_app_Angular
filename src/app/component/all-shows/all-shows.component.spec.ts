import { BookshowService } from 'src/app/services/bookshows.service';
import { ClipModule } from './../../clip/clip.module';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShowsComponent } from './all-shows.component';
import { ShowCardComponent } from '../show-card/show-card.component';

describe('AllShowsComponent', () => {
  let component: AllShowsComponent;
  let fixture: ComponentFixture<AllShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllShowsComponent, ShowCardComponent],
      providers: [
        {
          provide: [AuthService, BookshowService],
        },
      ],
      imports: [ClipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AllShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {});
});
