import { Component, OnInit } from '@angular/core';
import { GatewayService } from "../../../services/gateway.service";
import { History } from "../../../store/history/History";
import { HistoryListResponse } from "../../../store/history/HistoryListResponse";
import { LoaderService } from "../../partials/spinner/loader.service";

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.scss']
})
export class FestivalsComponent implements OnInit {
  listHistories: Array<History>;

  constructor(
    private getway: GatewayService,
    private loaderService: LoaderService
  ) {
    this.getway.updateMeta(
      "Черкаський драматичний театр імені Т. Г. Шевченка",
      "Історія Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка",
      "http://theatre-shevchenko.ck.ua/assets/images/logo.png"
    );
  }

  ngOnInit() {
    this.loaderService.start("about-festivals");
    this.getway.getHistoriesList().subscribe(
      (res: HistoryListResponse) => {
        this.listHistories = res.history;
        // console.log(this.listHistories[0].text); // del
        this.loaderService.stop("about-festivals");
      },
      (err) => this.loaderService.stop("about-festivals") // TODO: error handler
    );
    this.loaderService.start("about-festivals");
    this.getway.updateCanonicalURL();

  }

}
