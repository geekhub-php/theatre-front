import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';
import { GatewayService } from '../core/services/gateway.service';
import { Season } from '../core/model/season/Season';
import { ActivatedRoute, Router } from '@angular/router';
import { Performance } from '../core/model/performance/Performance';
import { Subscription } from 'rxjs';
import { EAudience } from '../core/model/Audience';

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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private loaderService: LoaderService,
    private appRoutes: Router,
    private activatedRoute: ActivatedRoute,
    private gatewayService: GatewayService
  ) {
  }

  ngOnInit() {
    this.loaderService.start('seasons');

    this.sub$.add(this.activatedRoute.queryParams
      .subscribe(params => {
        this.activeSeasonNumber = params['season'] ? +params['season'] : this.activeSeasonNumber;
        this.activeAudience = params['audience'] ? params['audience'] : null;
      }));

    this.sub$.add(this.gatewayService.getSeasons()
      .subscribe(seasons => {
        this.activeSeasonNumber = this.activeSeasonNumber ? this.activeSeasonNumber : seasons[0].number;
        this.activeAudience = this.activeAudience ? this.activeAudience : seasons[0].audience;
        this.seasons = seasons;
        this.changeDetector.markForCheck();
        this.loaderService.stop('seasons');
      }));
  }

  loadSeason(seasonNumber: number) {
    this.activeSeasonNumber = seasonNumber;
    const queryParams: { season: number, audience?: string } = { season: this.activeSeasonNumber };

    if (!!this.activeAudience) queryParams.audience = this.activeAudience;
    this.appRoutes.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  filterAudience(audienceType: EAudience) {
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
