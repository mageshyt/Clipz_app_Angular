import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TabsContainerComponent } from './tabs-container.component';
import { TabComponent } from '../tab/tab.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

//! dummy content
@Component({
  template: `
    <app-tabs-container>
      <app-tab tabTitle="Tab 1">Tab 1 content</app-tab>
      <app-tab tabTitle="Tab 2">Tab 2 content</app-tab>
      <app-tab tabTitle="Tab 3">Tab 3 content</app-tab>
    </app-tabs-container>
  `,
})
class MockTabComponent {
  constructor() {}
}

describe('TabsContainerComponent', () => {
  let fixture: ComponentFixture<MockTabComponent>;
  let component: MockTabComponent;

  beforeEach(async () => {
    //! load and config the component
    await TestBed.configureTestingModule({
      declarations: [TabsContainerComponent, TabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    //! create the component
    fixture = TestBed.createComponent(MockTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 tabs', () => {
    const tabs = fixture.nativeElement.querySelectorAll('app-tab');
    //! check the length of the tabs array is 3
    expect(tabs.length).toBe(3);

    const containerComponent = fixture.debugElement.query(
      By.css('app-tabs-container')
    );
    //! check the length of the tabs array is 3
    const tabsProps = containerComponent.queryAll(By.css('app-tab'));
    expect(tabsProps.length).toBe(3);
  });
});
