import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  donateBlockVisible = false;

  constructor(private gatewayService: GatewayService) {
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Підтримка Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  openFile() {
    const URL = 'https://d2m6zqv2ffku71.cloudfront.net/support-theatre.png';
    window.open(URL, '_blank');
  }
}
