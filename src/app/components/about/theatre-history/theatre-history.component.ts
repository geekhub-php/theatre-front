import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../../services/gateway.service';
import { History } from '../../../store/history/History';
import { HistoryListResponse } from '../../../store/history/HistoryListResponse';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-theatre-history',
  templateUrl: './theatre-history.component.html',
  styleUrls: ['./theatre-history.component.scss'],
})
export class TheatreHistoryComponent implements OnInit {
  listHistories: Array<History>;

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
    this.getway.getHistoriesList().subscribe(
      (res: HistoryListResponse) => {
        this.listHistories = res.history;
        this.loaderService.stop('about-history');
      },
      (err) => this.loaderService.stop('about-history')
    );
    this.loaderService.start('about-history');
    this.getway.updateCanonicalURL();
  }
}
