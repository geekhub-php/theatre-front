import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-board-trustees',
  templateUrl: './board-trustees.component.html',
  styleUrls: ['./board-trustees.component.scss']
})
export class BoardTrusteesComponent implements OnInit {

  constructor(private gatewayService: GatewayService) {
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Піклувальна рада Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }
}
