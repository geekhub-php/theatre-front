import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';
import { GatewayService } from '../core/services/gateway.service';
import { Season } from '../core/model/season/Season';
import { ActivatedRoute, Router } from '@angular/router';
import { Performance } from '../core/model/performance/Performance';
import { Subscription } from 'rxjs';

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

  activeAudience: 'kids' | 'adults' | null;
  ALL_AUDIENCE = null;
  KIDS_AUDIENCE: 'kids' = 'kids';
  ADULT_AUDIENCE: 'adults' = 'adults';

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
      .subscribe(params => this.activeSeasonNumber = params['season'] ? +params['season'] : this.activeSeasonNumber));

    this.sub$.add(this.gatewayService.getSeasons()
      .subscribe(seasons => {
        this.activeSeasonNumber = this.activeSeasonNumber ? this.activeSeasonNumber : seasons[0].number;
        this.seasons = seasons;
        this.changeDetector.markForCheck();
        this.loaderService.stop('seasons');
      }));
  }

  loadSeason(seasonNumber: number) {
    this.activeSeasonNumber = seasonNumber;
    this.appRoutes.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {season: seasonNumber}
    });
  }

  filterAudience(audienceType: 'kids' | 'adults' | null) {
    this.activeAudience = audienceType;
  }

  filterSeasonsByPerformance(seasons: Array<Season>, performance: Performance) {
    return [...seasons].filter((season) => performance.seasons.find((prSeason) => season.number === prSeason.number));
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
