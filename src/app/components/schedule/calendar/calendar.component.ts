import { Component, OnDestroy, OnInit } from '@angular/core';
import { PerformanceEvent } from '../../../store/schedule/PerformanceEvent';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';
import { MonthsCarouselService } from '../months-carousel/months-carousel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  events: Array<PerformanceEvent>;
  dayPerformances: Array<PerformanceEvent>;
  weeks: Array<Array<Date>> | null = null;
  showMore = false;
  activeDay: Date | null = null;
  selectedDate: Date
  middleOfMonth = 15

  sliderSubscription: Subscription;
  calendarSubscription: Subscription;

  constructor(private loaderService: LoaderService,
              private calendar: CalendarService,
              private slider: MonthsCarouselService) {
    this.getMonth();
    
    this.slider.setActiveMonth();
  }

  ngOnInit() {
    this.calendar.getPerformanceEvents().then(() => { 
      this.getPerformanceEvents();
    });
  }

  hasPerformanceByDate(date: Date): boolean {
    this.dayPerformances = this.getPerformancesByDate(date);

    return this.dayPerformances.length > 0;
  }

  getPerformancesByDate(date: Date): Array<PerformanceEvent> {
    if (!this.events) return [];

    return this.events.filter((event: PerformanceEvent) => {
      return +event.month === date.getMonth() + 1 && +event.day === date.getDate();
    });
  }

  getMonth() {
    this.sliderSubscription = this.slider.getMonth().subscribe(month => {
      this.selectedDate = month.currentFullDate;
    });
  }

  onShowMore(day: Date) {
    this.showMore = !this.showMore;
    this.activeDay = day;
    console.log(this.activeDay)
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendarSubscription = this.calendar.events.subscribe((value) => {
      this.events = value;
      this.weeks = this.calendar.weeks;
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
