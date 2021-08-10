import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

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

  ngOnInit() {
    this.loaderService.start('about');
    this.getway.updateCanonicalURL();
  }
}
