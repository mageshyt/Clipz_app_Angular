/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { DatePipe } from '@angular/common';
import { FbTimestampPipe } from 'src/app/pipes/fb-timestamp.pipe';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    component.gameTitle = 'test';
    component.gameImage = 'assets/img/1.jpg';
    component.UploadedDate = new Date();
    component.postedBY = 'Magesh yt';
    component.gameID = '2';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a game title', () => {
    const title = fixture.nativeElement.querySelector('.game-title');
    expect(title.textContent.trim()).toBe('test');
  });

  it("check owner's name", () => {
    const owner = fixture.nativeElement.querySelector('.owner');
    expect(owner.textContent.trim()).toBe('Magesh yt');
  });

  it('check game image', () => {
    const image = fixture.nativeElement.querySelector('.game-image');
    expect(image.getAttribute('src')).toBe('assets/img/1.jpg');
  });
});
