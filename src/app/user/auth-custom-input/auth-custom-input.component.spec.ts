import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCustomInputComponent } from './auth-custom-input.component';

describe('AuthCustomInputComponent', () => {
  let component: AuthCustomInputComponent;
  let fixture: ComponentFixture<AuthCustomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCustomInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
