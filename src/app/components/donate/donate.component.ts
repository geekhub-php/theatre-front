import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  donateBlockVisible = false;
  options: AnimationOptions = {
    path: 'assets/animations/theatre_finance.json',
  };
  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '220px',
    margin: '0 auto',
    paddingBottom: '10px'
  };

  constructor(private gatewayService: GatewayService) {
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Підтримка Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  openFile(url: string) {
    window.open(url, '_blank');
  }
}
