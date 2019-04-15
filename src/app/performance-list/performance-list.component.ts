import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceListResponse } from '../core/model/PerformanceListResponse';
import { Performance } from '../core/model/Performance';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss']
})
export class PerformanceListComponent implements OnInit {
  response: PerformanceListResponse;
  perfomances: Array<Performance>;

  constructor(private gateway: GatewayService, private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.loaderService.start('about');

    this.gateway.getPerformanceList().subscribe(
      (result) => {
        this.perfomances = result.performances;
        this.loaderService.stop('about');
      },
      err => this.loaderService.stop('about')
    );
    this.loaderService.start('about');
  }
}

