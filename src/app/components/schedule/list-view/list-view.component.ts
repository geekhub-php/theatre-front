import { Component, OnDestroy, OnInit } from '@angular/core';
import { PerformanceEvent } from '../../../store/schedule/PerformanceEvent';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';
import { MonthsCarouselService } from '../months-carousel/months-carousel.service'
import { Subscription } from 'rxjs';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {

  events: Array<PerformanceEvent>;
  date: Date;
  currentDate: Date
  sliderSubscription: Subscription
  calendarSubscription: Subscription

  constructor(private gateway: GatewayService,
              private slider: MonthsCarouselService,
              private loaderService: LoaderService,
              private calendar: CalendarService) { }

  ngOnInit() {
    this.getMonth()
    this.slider.setActiveMonth()
    this.calendar.getPerformanceEvents()
      .then(() => this.getPerformanceEvents()
    );
    // this.date = this.calendar.currentDate;
  }

  getMonth() {
    this.sliderSubscription = this.slider.getMonth().subscribe(month => {
      this.currentDate = month.currentFullDate;
    })
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendarSubscription = this.calendar.events.subscribe((value) => {
      console.log(value)
      this.events = value.filter(({date_time}) => {
        const resDate = new Date(date_time)
        const monthsEqual = resDate.getMonth() === this.currentDate.getMonth()
        return (resDate >= new Date()) && monthsEqual
    })
      this.loaderService.stop('poster');
    }, err => this.loaderService.stop('poster'));
  }

  delSubscription(subscription: Subscription){
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.delSubscription(this.sliderSubscription);
    this.delSubscription(this.calendarSubscription);
  }
}