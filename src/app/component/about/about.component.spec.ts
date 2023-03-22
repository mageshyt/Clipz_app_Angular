import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';


describe('About component', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create ', () => {
    expect(component);
  });
  it('text inner text of the container', () => {
    const text = fixture.nativeElement.querySelector('.container').textContent;
    expect(text).contain(
      'This is a basic about page to demonstrate basic routing capabilities.'
    );
  });
});
