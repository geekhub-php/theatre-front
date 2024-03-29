import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { LoaderService } from '../../partials/spinner/loader.service';
import { GatewayService } from '../../../services/gateway.service';
import { Season } from '../../../store/season/Season';
import { Performance } from '../../../store/performance/Performance';
import { EAudience } from '../../../store/Audience';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {
  @Input() performance: Performance = null;
  sub$: Subscription = new Subscription();

  seasons: Array<Season>;
  activeSeasonNumber: number;
  ALL_SEASONS = -1;
  ARCHIVE_SEASON = -2;

  EAudience = EAudience;
  activeAudience: EAudience = null;

  viewMode = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loaderService: LoaderService,
    private appRoutes: Router,
    private activatedRoute: ActivatedRoute,
    private gatewayService: GatewayService
  ) { }

  ngOnInit() {
    this.viewMode = !!this.performance;

    this.loaderService.start('seasons');

    this.sub$.add(this.activatedRoute.queryParams
      .subscribe(params => {
        this.activeSeasonNumber = params['season'] ? +params['season'] : this.activeSeasonNumber;
        this.activeAudience = params['audience'] ? params['audience'] : null;
      }));

    this.sub$.add(this.gatewayService.getSeasons()
      .subscribe(seasons => {
        this.seasons = this.viewMode ? this.filterSeasonsByPerformance(seasons, this.performance) : seasons;
        this.loaderService.stop('seasons');

        if (this.viewMode) return;

        this.activeSeasonNumber = this.activeSeasonNumber ? this.activeSeasonNumber : seasons[0].number;
        this.activeAudience = this.activeAudience ? this.activeAudience : seasons[0].audience;
        this.changeDetector.markForCheck();
      }));
  }

  loadSeason(seasonNumber: number) {
    this.activeSeasonNumber = seasonNumber;
    const queryParams: { season: number, audience?: string } = { season: this.activeSeasonNumber };

    if (!!this.activeAudience) queryParams.audience = this.activeAudience;
    this.appRoutes.navigate(['repertoire'], { queryParams });
  }

  filterAudience(audienceType: EAudience) {
    if (this.viewMode) return;

    this.activeAudience = audienceType;
    const queryParams: { season: number, audience?: EAudience } = { season: this.activeSeasonNumber };

    if (!!audienceType) queryParams.audience = this.activeAudience;
    this.appRoutes.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  filterSeasonsByPerformance(seasons: Array<Season>, performance: Performance) {
    return [...seasons].filter((season) => performance.seasons.find((prSeason) => season.number === prSeason.number));
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
