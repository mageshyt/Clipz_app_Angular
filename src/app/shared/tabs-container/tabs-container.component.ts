import { TabComponent } from './../tab/tab.component';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs?: QueryList<TabComponent> =
    new QueryList<TabComponent>();

  constructor() {}

  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter((tab) => tab.active);
    if (activeTabs?.length === 0) {
      this.selectTab(this.tabs!.first);
    }
  }
  selectTab(tab: TabComponent): boolean {
    //! every time we select a tab, we want to deactivate all the other tabs
    this.tabs?.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    return false;
  }
}
