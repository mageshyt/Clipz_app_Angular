import { By } from '@angular/platform-browser';
import { GameCardComponent } from './game-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';



@Component({
  selector: 'app-mock-card',
  template: ` 
  <div class="app-mock-card">
  <app-game-card gameTitle="testing"> </app-game-card> 
  </div>
  `

})
export class MockCardComponent {
  constructor(public router: Router) { }


}


describe('Game-card ', () => {
  let fixture: ComponentFixture<MockCardComponent>;
  let component: MockCardComponent;

beforeEach(async () => {

    TestBed.configureTestingModule({
      declarations: [GameCardComponent, MockCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create Component', () => {

    expect(component).toBeTruthy();
  });
  // check title rendered or not

  it('should render title', () => {

    const title = fixture.nativeElement.querySelectorAll('.game-title')
    console.log(title[0].textContent)
    expect(title[0].textContent.trim()).toEqual('testing');
  });

});
