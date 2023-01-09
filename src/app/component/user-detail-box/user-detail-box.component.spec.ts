import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailBoxComponent } from './user-detail-box.component';

describe('UserDetailBoxComponent', () => {
  let component: UserDetailBoxComponent;
  let fixture: ComponentFixture<UserDetailBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
