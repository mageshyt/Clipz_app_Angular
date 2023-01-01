import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { By } from '@angular/platform-browser';

describe('header component', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockedAuthService = jasmine.createSpyObj(
    'AuthService',
    ['createUser', 'signOut'],
    {
      isAuthenticated$: of(true),
    }
  );
  console.log('mockedAuthService', mockedAuthService);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockedAuthService,
        },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    //! create the component
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ! exercise
  it('should have a logout button', () => {
    const logoutButton = fixture.debugElement.query(By.css('.logout-btn'));
    expect(logoutButton).withContext('no logout button found').toBeTruthy();

    // ! trigger click event
    logoutButton.triggerEventHandler('click', null);
    const service = TestBed.inject(AuthService);
    expect(service.signOut).
    withContext("couldn't call the signOut method").
    toHaveBeenCalled();
  });
  // ! exercise
});
