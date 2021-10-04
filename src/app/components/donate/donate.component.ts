import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';
import { sideBarAnimation } from 'app/utilities/side-bar-animation';
import { ESidebar, SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: [ './donate.component.scss' ],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})
export class DonateComponent implements OnInit {
  donateBlockVisible = false;

  constructor(
    private gatewayService: GatewayService,
    private sidebarService: SidebarService) {
    this.sidebarService.subject.subscribe(state => {
      this.donateBlockVisible = state.isActive && state.barName === ESidebar.donate;
    });
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Підтримка Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  disablePage() {
    this.sidebarService.close(ESidebar.donate);
  }
}
