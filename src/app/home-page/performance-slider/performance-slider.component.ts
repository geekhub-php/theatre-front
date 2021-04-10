import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import { Gallery, GalleryRef } from 'ng-gallery';

import { PerformanceEvent } from '../../core/model/schedule/PerformanceEvent';
import { GatewayService } from '../../core/services/gateway.service';
import { trigger } from '@angular/animations';
import { Employee } from '../../core/model/employee/Employee';
@Component({
  selector: 'app-performance-slider',
  templateUrl: './performance-slider.component.html',
  styleUrls: ['./performance-slider.component.scss'],
  animations: [
    trigger('slideAnimation', [])
  ]
})
export class PerformanceSliderComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: NgbCarousel;
  sliderList: Array<PerformanceEvent> = [];

  employeeList: Array<Employee> = [];

  galleryId = 'basic-test';
  cover: any;


  constructor(private gateway: GatewayService, public gallery: Gallery) { }

  ngAfterViewInit() {
    this.carousel.pause();
  }

  ngOnInit(): void {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

    this.gateway.getPerformanceEventList().subscribe(res => {
      this.sliderList = res.performance_events;
      console.log(this.sliderList, 'sliderList');
      this.sliderList.map(item => galleryRef.addImage({
        src: item.performance.sliderImage.slider_slider.url,
        title: item.performance.title,
        type: item.performance.type,
        date: item.date_time,
        venuePerformance: item.venue,
        ticket: item.buy_ticket_link
      }));
    });
  }
}

