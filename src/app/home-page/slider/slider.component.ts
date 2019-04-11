import { Component, OnInit, Input } from '@angular/core';
import { GatewayService } from '../../core/service/gateway.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  sliderList: Array<any>;
  slideId: number;
  count = 2;
  activeSlide = 0;

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
    this.gateway.getPerformanceEventList().subscribe(res => {
      this.sliderList = res.performance_events;
      this.slideId = this.sliderList[this.count].id;
    });
  }

  setActiveSlide(idx: number) {
    this.activeSlide = idx;
  }
}
