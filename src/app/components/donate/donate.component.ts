import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';
import { DonateService } from './donate.service';
import { sideBarAnimation } from 'app/utilities/side-bar-animation';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: [ './donate.component.scss' ],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})
export class DonateComponent implements OnInit {
  donateBlockVisible = false;

  constructor(private gatewayService: GatewayService, private donateService: DonateService) {
    this.donateService.donateVisibility.subscribe(({ active }) => {
      this.donateBlockVisible = active;
    });
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Підтримка Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  activePage() {
    this.donateService.activeDonateMenu();
  }

  disablePage() {
    this.donateService.disableDonateMenu();
  }
}
