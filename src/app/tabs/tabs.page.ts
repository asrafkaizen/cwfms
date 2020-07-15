import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('tabs', {static: true, read: IonTabs}) private tabsRef: IonTabs //static true adding according to angular

  constructor() { }

  ngOnInit() {
    //todo fix below line so that it works
    // this.tabsRef.select('tabs/feed');
  }

  

}
