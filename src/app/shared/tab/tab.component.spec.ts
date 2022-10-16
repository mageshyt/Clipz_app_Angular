import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabComponent } from './tab.component';

describe('Tab component', () => {
  let fixture: ComponentFixture<TabComponent>;
  let component: TabComponent;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create tab component ', () => {
    expect(component).toBeTruthy();
  });

  // check hidden class there or not
  it('Should have .hidden class ', () => {
    expect(fixture.nativeElement.querySelector('.hidden')).toBeTruthy();
  });

  it('should not have .hidden class', () => {
    component.active = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.hidden')).not.toBeTruthy();
  });

  
});
