import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';
import { CalendarService } from './calendar.service';
import { MonthsCarouselService } from './months-carousel/months-carousel.service';
import { Subscription } from 'rxjs';

export enum ScheduleViewModes {
  CALENDAR = 'Calendar',
  LIST = 'List',
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date: Date;
  isToday: boolean;
  isSwitcherActive = false;
  viewMode: ScheduleViewModes = ScheduleViewModes.LIST;
  views = ScheduleViewModes;
  sliderSubscription: Subscription;

  activeComp = {
    calendarActive: false,
    listActive: true
  };

  private timeout;

  constructor(
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private calendar: CalendarService,
    private slider: MonthsCarouselService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const innerWidth = window.innerWidth;
    const calendarBreakpointWidth = 1199;

    this.isSwitcherActive = innerWidth > calendarBreakpointWidth;
    this.viewMode = this.isSwitcherActive ? ScheduleViewModes.CALENDAR : ScheduleViewModes.LIST;
  }

  ngOnInit() {
    this.loaderService.start('poster');
    this.getMonth();

    this.viewMode = this.savedLocale;
    this.onResize();
    this.gateway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Афіша Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
    this.gateway.updateCanonicalURL();
    this.setViewMode();
  }

  delTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  selectMonth() {
    const requestDelay = 300;
    this.delTimeout();
    // setTimeout used to prevent requests if user switches months too frequently
    this.timeout = setTimeout(() => {
      this.calendar.getPerformanceByDate(this.date);
      this.isToday = this.calendar.isToday(this.date);
    }, requestDelay);
  }

  setViewMode() {
    if  (this.viewMode === ScheduleViewModes.CALENDAR) {
      this.changeViewToCalendar();
    } else if (this.viewMode === ScheduleViewModes.LIST) {
      this.changeViewToList();
    }
  }

  changeViewToCalendar() {
    this.viewMode = ScheduleViewModes.CALENDAR;
    if (this.activeComp.listActive) this.activeComp.listActive = false;
    this.activeComp.calendarActive = true;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viewMode', JSON.stringify(this.viewMode));
    }
    this.onResize();
  }

  changeViewToList() {
    this.viewMode = ScheduleViewModes.LIST;
    if (this.activeComp.calendarActive) this.activeComp.calendarActive = false;
    this.activeComp.listActive = true;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viewMode', JSON.stringify(this.viewMode));
    }
    this.onResize();
  }

  getMonth() {
    this.sliderSubscription = this.slider.getMonth().subscribe(month => {
      if (month && month.currentFullDate) {
        this.date = month.currentFullDate;
        this.isToday = this.calendar.isToday(this.date);
      }
    });
  }

  delSubscription(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.delSubscription(this.sliderSubscription);
    this.delTimeout();
  }

  get savedLocale() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('viewMode')) || ScheduleViewModes.LIST;
    }

    return ScheduleViewModes.LIST;
  }
}
