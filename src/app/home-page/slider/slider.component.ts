import { Component, OnInit, Input } from '@angular/core';
import { GatewayService } from '../../core/services/gateway.service';
import { PerformanceEvent } from '../../core/model/schedule/PerformanceEvent';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  sliderList: Array<PerformanceEvent> = [];
  slideId: number;
  count = 0;

  constructor(private gateway: GatewayService) {
  }

  ngOnInit() {
    this.gateway.getPerformanceEventList().subscribe(res => {
      this.sliderList = res.performance_events;
      this.slideId = this.sliderList[this.count].id;
    });
  }

  next() {
    if (this.count < this.sliderList.length - 1) {
      this.count++;
    } else {
      this.count = 0;
    }
    this.slideId = this.sliderList[this.count].id;
  }

  prev() {
    if (this.count < this.sliderList.length) {
      this.count--;
    }
    if (this.count < 0) {
      this.count = this.sliderList.length - 1;
    }
    this.slideId = this.sliderList[this.count].id;
  }

  slide(idx: number) {
    this.count = idx;
    this.slideId = this.sliderList[this.count].id;
  }
}

