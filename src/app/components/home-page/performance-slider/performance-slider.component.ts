import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { Gallery, GalleryRef } from 'ng-gallery';

import { PerformanceEvent } from '../../../store/schedule/PerformanceEvent';
import { GatewayService } from '../../../services/gateway.service';

@Component({
  selector: 'app-performance-slider',
  templateUrl: './performance-slider.component.html',
  styleUrls: [ './performance-slider.component.scss' ],
  animations: [
    trigger('slideAnimation', [])
  ]
})

export class PerformanceSliderComponent implements OnInit {

  sliderList: Array<PerformanceEvent> = [];
  galleryId = 'slider';
  cover: any;

  constructor(
    private gateway: GatewayService,
    public gallery: Gallery
  ) { }

  ngOnInit(): void {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

    this.gateway
      .getPerformanceEventList()
      .subscribe(res => {
        this.sliderList = res.performance_events;
        this.sliderList.map(item => galleryRef.addImage({
          src: item.performance.sliderImage.slider_slider.url,
          title: item.performance.title,
          type: item.performance.type,
          date: item.date_time,
          venuePerformance: item.venue,
          ticket: item.buy_ticket_link,
          ageLimit: item.performance.age_limit
        }));
      });
  }
}

