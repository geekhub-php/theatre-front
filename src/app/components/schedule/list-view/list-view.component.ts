import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';
import { MonthsCarouselService } from '../months-carousel/months-carousel.service';
import { Subscription } from 'rxjs';
import { ScheduleViewModes } from '../schedule.component';
import { LangService, Locales } from '../../../services/lang.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: [ './list-view.component.scss' ]
})
export class ListViewComponent implements OnInit, OnDestroy {
  @Input() viewMode: ScheduleViewModes;
  views = ScheduleViewModes;

  events: Array<PerformanceEvent> = [];
  date: Date;
  currentDate: Date;
  sliderSubscription: Subscription;
  calendarSubscription: Subscription;
  loaderSubscription: Subscription;
  loader: boolean;
  localeId: Locales = Locales.en;

  constructor(private slider: MonthsCarouselService,
              private loaderService: LoaderService,
              private calendar: CalendarService,
              private langService: LangService) {
    this.langService.localeId$.subscribe(localeId => {
      this.localeId = localeId;
    });
    this.loaderSubscription = this.loaderService.subject.subscribe(spinner => {
      this.loader = spinner.load;
    });
  }

  ngOnInit() {
    this.getMonth();
    this.slider.setActiveMonth();
    this.calendar.getPerformanceEvents()
      .then(() => this.getPerformanceEvents()
      );
  }

  getMonth() {
    this.sliderSubscription = this.slider.getMonth().subscribe(month => {
      this.currentDate = month.currentFullDate;
    });
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendarSubscription = this.calendar.events.subscribe((value) => {
      this.events = value.filter(({ date_time }) => {
        const resDate = new Date(date_time);
        if (resDate && this.currentDate) {
          const monthsEqual = resDate.getMonth() === this.currentDate.getMonth();

          return (resDate >= new Date()) && monthsEqual;
        }
      });
      this.events = this.events.map((event, i) => {
        const { day, month } = event;
        const prevEvent = this.events[i - 1];
        event.dateExist = false;
        if (prevEvent) {
          const { day: prevDay, month: prevMonth } = prevEvent;
          if (day === prevDay && month === prevMonth) {
            event.dateExist = true;
          }
        }

        return event;
      });
      this.loaderService.stop('poster');
    }, err => this.loaderService.stop('poster'));
  }

  delSubscription(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.delSubscription(this.sliderSubscription);
    this.delSubscription(this.calendarSubscription);
    this.delSubscription(this.loaderSubscription);
  }
}
