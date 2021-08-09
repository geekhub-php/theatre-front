import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  donateBlockVisible = false;

  constructor(private gatewayService: GatewayService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(({ donate }) => {
      if (donate) {
        this.donateBlockVisible = true;
      }
    });
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Підтримка Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }
}
