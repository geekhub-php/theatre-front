import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { GatewayService } from '../core/services/gateway.service';
import { PerformanceListResponse } from '../core/model/performance/PerformanceListResponse';
import { Performance } from '../core/model/performance/Performance';
import { LoaderService } from '../shared/spinner/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

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
    private activatedRoute: ActivatedRoute,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    this.seasonNumber = +this.activatedRoute.snapshot.queryParamMap.get('season') || this.CURRENT_SEASON;
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber = params['season'] || this.CURRENT_SEASON;
      this.getPerformances(this.seasonNumber);
    });
    this.updateMeta();
    this.gateway.updateCanonicalURL();
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

  updateMeta() {
    this.meta.updateTag({ property: 'og:title', content: 'Черкаський драматичний театр імені Т. Г. Шевченка' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Репертуар Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/assets/images/logo.png'});
  }
}
