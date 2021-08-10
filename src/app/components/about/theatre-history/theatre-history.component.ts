import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-theatre-history',
  templateUrl: './theatre-history.component.html',
  styleUrls: ['./theatre-history.component.scss'],
})
export class TheatreHistoryComponent implements OnInit {
  
  constructor(
    private getway: GatewayService,
    private loaderService: LoaderService
  ) {
    this.getway.updateMeta(
      'Черкаський драматичний театр імені Т. Г. Шевченка',
      'Історія Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png'
    );
  }

  ngOnInit(): void {
    this.loaderService.start('about-history');
    this.getway.updateCanonicalURL();
  }
}
