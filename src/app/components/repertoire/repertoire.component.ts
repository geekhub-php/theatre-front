import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GatewayService } from '../../services/gateway.service';
import { PerformanceListResponse } from '../../store/performance/PerformanceListResponse';
import { Performance } from '../../store/performance/Performance';
import { LoaderService } from '../partials/spinner/loader.service';

enum RepertoireViewModes {
  DESKTOP = 'Desktop',
  TABLET = 'Tablet',
  MOBILE = 'Mobile'
}

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: [ './repertoire.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepertoireComponent implements OnInit, OnDestroy {

  pageSize = 16;
  page = 1;
  collectionSize: number;
  scrollToBottomDuePagination = null;

  response: PerformanceListResponse;
  performances: Array<Performance>;
  seasonNumber: number;
  audience: 'kids' | 'adults' | null;
  CURRENT_SEASON = 0; // api conventions to get recent season
  CURRENT_AUDIENCE = null;

  viewMode: null | RepertoireViewModes = null;
  views = RepertoireViewModes;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {}

  @HostListener('window:resize', [ '$event' ]) onResize() {
    const desktop = 1480;
    const mobile = 768;
    const { innerWidth } = window;
    this.viewMode = innerWidth >= desktop ?
      RepertoireViewModes.DESKTOP : innerWidth < desktop && innerWidth > mobile ?
        RepertoireViewModes.TABLET :
        RepertoireViewModes.MOBILE;
  }

  ngOnInit() {
    this.seasonNumber = +this.activatedRoute.snapshot.paramMap.get('season') || this.CURRENT_SEASON;
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber = params['season'] || this.CURRENT_SEASON;
      this.audience = params['audience'] || this.CURRENT_AUDIENCE;
      this.getPerformances(this.seasonNumber, this.audience);
    });
    this.onResize();
  }

  livePageAtBottom(e) {
    this.scrollToBottomDuePagination = setTimeout(() => {
      window.scrollTo({ top: Number(e.pageY) + Number(e.clientY), behavior: 'auto' });
    });
  }

  getPerformances(seasonNumber: number, audience: 'kids' | 'adults' | null) {
    this.performances = [];
    this.loaderService.start('repertoire');

    const getSeasonPerformancesSub$ = audience
      ? this.gateway.getSeasonPerformances(seasonNumber, audience)
      : this.gateway.getSeasonPerformances(seasonNumber);

    getSeasonPerformancesSub$
      .subscribe((performances) => {
          this.performances = performances;
          this.collectionSize = performances.length;
          this.changeDetector.markForCheck();
          this.loaderService.stop('repertoire');
        },
        error1 => this.loaderService.stop('repertoire')
      );
  }

  ngOnDestroy() {
    if (this.scrollToBottomDuePagination) {
      clearTimeout(this.scrollToBottomDuePagination);
    }
  }
}
