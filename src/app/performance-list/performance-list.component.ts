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
  seasonNumber: number|string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private appRoutes: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.seasonNumber = +this.activatedRoute.snapshot.queryParamMap.get('season') || 'current';
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber = params['season'] || 'current';
      // console.log(this.season);
      this.getPerformances(this.seasonNumber);
    });
    // this.appRoutes.events.subscribe(() => {
    //   this.season = +this.active.snapshot.queryParamMap.get('season') || 'current';
    //   console.log(this.season);
    //   // this.getPerformances(this.season);
    // });
    // this.getPerformances(this.seasonNumber);
  }

  getPerformances(season: number|string) {
    this.perfomances = [];
    this.loaderService.start('repertoire');
    this.gateway.getSeasonPerformances(season).subscribe((performances) => {
        this.perfomances = performances;
        this.changeDetector.markForCheck();
        this.loaderService.stop('repertoire');
      },
      error1 => this.loaderService.stop('repertoire')
    );
  }
}
