import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { NguCarouselConfig } from '@ngu/carousel';
import { GatewayService } from 'app/services/gateway.service';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';

@Component({
  selector: 'app-performance-slider',
  templateUrl: './performance-slider.component.html',
  styleUrls: [ './performance-slider.component.scss' ]
})

export class PerformanceSliderComponent implements OnInit, AfterContentChecked {
  isLoading = true;
  sliderList: Array<PerformanceEvent> = [];

  sliderOptions: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, all: 0 },
    slide: 4,
    speed: 300,
    interval: {
      timing: 5000,
      initialDelay: 3000
    },
    point: {
      visible: true
    },
    load: 2,
    loop: true,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(private gateway: GatewayService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gateway
      .getPerformanceEventList()
      .subscribe(res => {
        this.isLoading = false;
        res.performance_events.forEach(item => {
          this.sliderList.push({
            src: item.performance.sliderImage.slider_slider.url,
            title: item.performance.title,
            type: item.performance.type,
            date_time: item.date_time,
            venue: item.venue,
            buy_ticket_link: item.buy_ticket_link,
            ageLimit: item.performance.age_limit,
            slug: item.performance.slug
          });
        });
      });
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}

