import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  listHistories: [];

  constructor(private getway: GatewayService) { }

  ngOnInit() {
    this.getway.getHistoriesList().subscribe(res => {
      this.listHistories = res.history;
    });
  }
}
