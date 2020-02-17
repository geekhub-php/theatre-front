import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';
import { GatewayService } from '../core/services/gateway.service';
import { Season } from '../core/model/season/Season';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {
  seasons: Array<Season>;
  activeSeasonNumber: number;

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

    this.activatedRoute.queryParams.subscribe(params => {
      this.activeSeasonNumber = params['season'] ? +params['season'] : this.activeSeasonNumber;
    });
    this.gatewayService.getSeasons().subscribe(seasons => {
      this.activeSeasonNumber = this.activeSeasonNumber ? this.activeSeasonNumber : seasons[0].number;
      this.seasons = seasons;
      this.changeDetector.markForCheck();
      this.loaderService.stop('seasons');
      });
  }

  loadSeason(season: Season) {
    this.activeSeasonNumber = season.number;
    this.appRoutes.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {season: season.number}
    });
  }
}
