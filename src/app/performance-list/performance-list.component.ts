import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceListResponse } from '../core/model/PerformanceListResponse';
import { Performance } from '../core/model/Performance';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss']
})
export class PerformanceListComponent implements OnInit {
  response: PerformanceListResponse;
  perfomances: Array<Performance>;

  constructor(private gateway: GatewayService) {

  }

  ngOnInit() {
    this.gateway.getPerformanceList().subscribe((result) => {
      this.perfomances = result.performances;
    });
  }

}
