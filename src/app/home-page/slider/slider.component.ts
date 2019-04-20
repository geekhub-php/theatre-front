import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GatewayService } from '../../core/service/gateway.service';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnDestroy, OnInit {
  intevalTime = 4000;
  source = interval(this.intevalTime);
  sliderList: Array<any>;
  slideId: number;
  count = 0;
  private ngUnSubscribe: Subject<void> = new Subject<void>();
  constructor(private gateway: GatewayService) { }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  ngOnInit() {
    this.gateway.getPerformanceEventList().subscribe(res => {
      this.sliderList = res.performance_events;
      this.slideId = this.sliderList[this.count].id;
      this.startInterval();
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
    } if (this.count < 0) {
      this.count = this.sliderList.length - 1;
    }
    this.slideId = this.sliderList[this.count].id;
  }

  slide(idx: number) {
    this.count = idx;
    this.slideId = this.sliderList[this.count].id;
  }

  startInterval() {
    this.source.pipe(takeUntil(this.ngUnSubscribe)).subscribe(() => {
      this.next();
    });
  }

  resetInterval() {
    this.ngUnSubscribe.next();
    this.startInterval();
  }
}  // ngOnDestroy() {
  //   this.ngUnSubscribe.next();
  //   this.ngUnSubscribe.complete();
  // }

