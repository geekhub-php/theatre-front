import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';
import { History } from '../core/model/history/History';
import { HistoryListResponse } from '../core/model/history/HistoryListResponse';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  listHistories: Array<History>;

  constructor(private getway: GatewayService, private loaderService: LoaderService) {
    this.getway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Історія Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
   }

  ngOnInit() {
    this.loaderService.start('about');
    this.getway.getHistoriesList().subscribe(
      (res: HistoryListResponse) => {
        this.listHistories = res.history;
        this.loaderService.stop('about');
      },
      err => this.loaderService.stop('about')
    );
    this.loaderService.start('about');
    this.getway.updateCanonicalURL();
  }
}
