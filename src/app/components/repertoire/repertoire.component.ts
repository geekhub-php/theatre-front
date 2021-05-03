import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GatewayService } from '../../services/gateway.service';
import { PerformanceListResponse } from '../../store/performance/PerformanceListResponse';
import { Performance } from '../../store/performance/Performance';
import { LoaderService } from '../partials/spinner/loader.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepertoireComponent implements OnInit {

  pageSize = 16;
  page = 1;
  collectionSize: number;

  response: PerformanceListResponse;
  perfomances: Array<Performance>;
  seasonNumber: number;
  audience: 'kids' | 'adults' | null;
  CURRENT_SEASON = 0; // api conventions to get recent season
  CURRENT_AUDIENCE = null;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.seasonNumber = +this.activatedRoute.snapshot.paramMap.get('season') || this.CURRENT_SEASON;
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber = params['season'] || this.CURRENT_SEASON;
      this.audience = params['audience'] || this.CURRENT_AUDIENCE;
      this.getPerformances(this.seasonNumber, this.audience);
    });
  }

  getPerformances(seasonNumber: number, audience: 'kids' | 'adults' | null) {
    this.perfomances = [];
    this.loaderService.start('repertoire');

    const getSeasonPerformancesSub$ = audience
      ? this.gateway.getSeasonPerformances(seasonNumber, audience)
      : this.gateway.getSeasonPerformances(seasonNumber);

    getSeasonPerformancesSub$
      .subscribe((performances) => {
        this.perfomances = performances;
        this.collectionSize = performances.length;
        this.changeDetector.markForCheck();
        this.loaderService.stop('repertoire');
      },
      error1 => this.loaderService.stop('repertoire')
    );
  }
}
