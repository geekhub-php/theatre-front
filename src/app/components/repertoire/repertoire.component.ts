import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GatewayService } from '../../services/gateway.service';
import { PerformanceListResponse } from '../../store/performance/PerformanceListResponse';
import { Performance } from '../../store/performance/Performance';
import { LoaderService } from '../partials/spinner/loader.service';

enum RepertoireViewModes {
  xxl = 'xxl',
  xl = 'xl',
  md = 'md',
  sm = 'sm'
}

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: [ './repertoire.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepertoireComponent implements OnInit {

  pageSize = 18;
  page = 2;
  collectionSize: number;

  response: PerformanceListResponse;
  performances: Array<Performance>;
  seasonNumber: number;
  audience: 'kids' | 'adults' | null;
  CURRENT_SEASON = 0; // api conventions to get recent season
  CURRENT_AUDIENCE = null;

  viewMode: null | RepertoireViewModes = null;
  views = RepertoireViewModes;

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) {}

  @HostListener('window:resize', [ '$event' ]) onResize() {
    const xxlPageAmount = 16;
    const xlPageAmount = 15;
    const mdPageAmount = 14;
    const xxl_min = 1499;
    const xl_min = 1199;
    const sm_min = 575;

    const { innerWidth } = window;

    this.viewMode = innerWidth > xxl_min
      ? RepertoireViewModes.xxl : innerWidth > xl_min
        ? RepertoireViewModes.xl : innerWidth > sm_min
          ? RepertoireViewModes.md : RepertoireViewModes.sm;

    this.pageSize = this.views.xxl === this.viewMode
      ? xxlPageAmount : this.views.xl === this.viewMode
        ? xlPageAmount : mdPageAmount;
  }

  ngOnInit() {
    this.page = +this.activatedRoute.snapshot.queryParamMap.get('page') || 1;
    this.seasonNumber = +this.activatedRoute.snapshot.paramMap.get('season') || this.CURRENT_SEASON;
    this.activatedRoute.queryParams.subscribe(params => {
      this.seasonNumber = params['season'] || this.CURRENT_SEASON;
      this.audience = params['audience'] || this.CURRENT_AUDIENCE;
      this.getPerformances(this.seasonNumber, this.audience);
    });
    this.onResize();
  }

  setFirstPage(firstPage: number) {
    this.page = firstPage;
  }

  goToPage(page: number) {
    const paramsWithAudience = !!this.audience ? { audience: this.audience, page } : { page };
    const paramsWithSeasonNumber = !!this.seasonNumber
      ? { season: this.seasonNumber, ...paramsWithAudience }
      : paramsWithAudience;

    this.page = page;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: paramsWithSeasonNumber
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
        error => {
          this.loaderService.stop('repertoire');
          this.changeDetector.markForCheck();
        }
      );
  }
}
