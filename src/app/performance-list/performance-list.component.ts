import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { GatewayService } from '../core/services/gateway.service';
import { PerformanceListResponse } from '../core/model/performance/PerformanceListResponse';
import { Performance } from '../core/model/performance/Performance';
import { LoaderService } from '../shared/spinner/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceListComponent implements OnInit {
  response: PerformanceListResponse;
  perfomances: Array<Performance>;
  seasonNumber: number;
  CURRENT_SEASON = 0; // api conventions to get recent season

  constructor(
    private changeDetector: ChangeDetectorRef,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private appRoutes: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.seasonNumber = +this.activatedRoute.snapshot.queryParamMap.get('season') || this.CURRENT_SEASON;
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber = params['season'] || this.CURRENT_SEASON;
      this.getPerformances(this.seasonNumber);
    });
  }

  getPerformances(seasonNumber: number) {
    this.perfomances = [];
    this.loaderService.start('repertoire');
    this.gateway.getSeasonPerformances(seasonNumber).subscribe((performances) => {
        this.perfomances = performances;
        this.changeDetector.markForCheck();
        this.loaderService.stop('repertoire');
      },
      error1 => this.loaderService.stop('repertoire')
    );
  }
}
