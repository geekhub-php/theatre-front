import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import { PerformanceEvent } from '../../core/model/schedule/PerformanceEvent';
import { GatewayService } from '../../core/services/gateway.service';


@Component({
  selector: 'app-performance-slider',
  templateUrl: './performance-slider.component.html',
  styleUrls: ['./performance-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerformanceSliderComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: NgbCarousel;
  sliderList: Array<PerformanceEvent> = [];

  constructor(private gateway: GatewayService) { }

  ngAfterViewInit() {
    this.carousel.pause();
  }

  ngOnInit(): void {
    this.gateway.getPerformanceEventList().subscribe(res => {
      this.sliderList = res.performance_events;
    });
  }
}
