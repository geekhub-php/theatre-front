import { Component, OnInit,  AfterContentChecked, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NguCarouselConfig } from '@ngu/carousel'; 

import { GatewayService } from '../../../services/gateway.service';
import { History } from '../../../store/history/History';
import { LoaderService } from '../../partials/spinner/loader.service';


@Component({
  selector: 'app-about-more',
  templateUrl: './about-more.component.html',
  styleUrls: ['./about-more.component.scss']
})
export class AboutMoreComponent implements OnInit, AfterContentChecked  {
  history: History;
  performanses: any;

  constructor(
    private _cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService
  ) { }

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6, all: 0 },
    gridBreakpoints: {
      sm: 1100,
      md: 1500,
      lg: 1800,
      xl: 2200,
    },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    loop: true,
    load: 2,
    velocity: 0,
    touch: false,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  ngAfterContentChecked(): void {
    this._cdr.detectChanges();
    // console.log('ngAfterContentChecked');
    // console.log(this.history);
  }
  
  ngOnInit() {
    const slug = this.route.snapshot.params.slug;
    this.loaderService.start('about-more');
    this.gateway
      .getHistoryBySlug(slug)
      .subscribe(
        (res) => {
          this.history = res;
          this.loaderService.stop('about-more');
          this.gateway.updateMeta(this.history.title,
            this.history.text,
            this.history.mainPicture.history_small.url);
          },
        err => this.loaderService.stop('about-more')
      );
    this.gateway.updateCanonicalURL();
  }
  
}
