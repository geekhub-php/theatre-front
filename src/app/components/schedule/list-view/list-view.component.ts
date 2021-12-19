import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

import { CalendarService } from '../calendar.service';
import { ScheduleViewModes } from '../schedule.component';
import { LangService, Locales } from 'app/services/lang.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: [ './list-view.component.scss' ]
})
export class ListViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() viewMode: ScheduleViewModes;
  views = ScheduleViewModes;

  activeMonth: Date;
  isDesktop = false;
  isLoading: boolean;
  localeId: Locales = Locales.en;
  loaderSubscription: Subscription;
  calendarSubscription: Subscription;
  events: Array<PerformanceEvent> = [];

  constructor(private langService: LangService,
              private calendar: CalendarService,
              private loaderService: LoaderService,
              private deviceService: DeviceDetectorService) {
    this.langService.localeId$.subscribe(localeId => {
      this.localeId = localeId;
    });

    this.loaderSubscription = this.loaderService.subject.subscribe(spinner => {
      this.isLoading = spinner.load;
    });
  }

  ngOnInit() {
    this.getPerformanceEvents();
    this.isDesktop = this.deviceService.getDeviceInfo().deviceType === 'desktop';
  }

  ngAfterViewInit() {
    this.calendar.getPerformanceEvents();
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendarSubscription = this.calendar.eventsData.subscribe((data) => {
      if (data.activeMonth && data.currentEvents && data.nextEvents) {
        this.activeMonth = data.activeMonth;

        if (this.activeMonth === data.currentMonth) {
          this.events = data.currentEvents;
        } else if (this.activeMonth === data.nextMonth) {
          this.events = data.nextEvents;
        }
      }

      if (this.events.length) {
        this.events = this.events.filter(({ date_time }) => {
          const resDate = new Date(date_time);

          if (resDate && this.activeMonth) {
            const monthsEqual = resDate.getMonth() === this.activeMonth.getMonth();

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
      }
      this.loaderService.stop('poster');
    }, () => this.loaderService.stop('poster'));
  }

  ngOnDestroy() {
    this.loaderSubscription?.unsubscribe();
    this.calendarSubscription?.unsubscribe();
  }
}
