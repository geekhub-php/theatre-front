import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  showMore = false;
  today = new Date();
  activeMonth: Date;
  weeks: Array<Array<Date>>;
  events: Array<PerformanceEvent>;
  calendarSubscription: Subscription;
  dayPerformances: Array<PerformanceEvent>;

  constructor(private loaderService: LoaderService, private calendar: CalendarService) {}

  ngOnInit() {
    this.getPerformanceEvents();
  }

  ngAfterViewInit() {
    this.calendar.getPerformanceEvents();
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

  onShowMore(day: Date) {
    this.showMore = !this.showMore;
    this.activeMonth = day;
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendarSubscription = this.calendar.eventsData.subscribe((data) => {
      if (data.activeMonth && data.currentEvents && data.nextEvents) {
        this.activeMonth = data.activeMonth;
        this.weeks = this.calendar.weeks(this.activeMonth);

        if (this.activeMonth === data.currentMonth) {
          this.events = data.currentEvents;
        } else if (this.activeMonth === data.nextMonth) {
          this.events = data.nextEvents;
        }

        this.loaderService.stop('poster');
      }
    }, () => this.loaderService.stop('poster'));
  }

  ngOnDestroy() {
    this.calendarSubscription?.unsubscribe();
  }
}
