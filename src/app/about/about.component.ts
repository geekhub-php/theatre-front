import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { History } from '../core/model/history/History';
import { HistoryListResponse } from '../core/model/history/HistoryListResponse';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  listHistories: Array<History>;

  constructor(private getway: GatewayService) { }

  ngOnInit() {
    this.getway.getHistoriesList().subscribe((res: HistoryListResponse) => {
      this.listHistories = res.history;
    });
  }
}
