import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';
import { CalendarService } from './calendar.service';

enum ScheduleViewModes {
  CALENDAR = 'Calendar',
  LIST = 'List',
  MOBILE = 'Mobile'
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  date: Date;
  isToday: boolean;

  viewMode: ScheduleViewModes = ScheduleViewModes.LIST;
  views = ScheduleViewModes;

  activeComp = {
    calendarActive: false,
    listActive: true
  };

  constructor(
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private calendar: CalendarService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const innerWidth = window.innerWidth;
    const calendarBreakpointWidth = 1020;
    const listBreakpointWidth = 975;

    switch (this.viewMode) {
      case ScheduleViewModes.CALENDAR:
        if (innerWidth < calendarBreakpointWidth) {
          this.viewMode = ScheduleViewModes.MOBILE;
        }
        break;

      case ScheduleViewModes.LIST:
        if (innerWidth < listBreakpointWidth) {
          this.viewMode = ScheduleViewModes.MOBILE;
        }
        break;

      case ScheduleViewModes.MOBILE:
        const savedMode = this.savedLocale;
        if (savedMode === ScheduleViewModes.CALENDAR && innerWidth >= calendarBreakpointWidth) {
          this.viewMode = ScheduleViewModes.CALENDAR;

          break;
        }

        if (savedMode === ScheduleViewModes.LIST && innerWidth >= listBreakpointWidth) {
          this.viewMode = ScheduleViewModes.LIST;
        }
        break;

      default:
        break;
    }
  }

  ngOnInit() {
    this.loaderService.start('poster');
    this.date = this.calendar.currentDate;
    this.isToday = this.calendar.isToday(this.date);

    this.viewMode = this.savedLocale;
    this.onResize();

    this.gateway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Афіша Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
    this.gateway.updateCanonicalURL();
  }

  prevMonth() {
    this.date = this.calendar.prevMonth();
    this.isToday = this.calendar.isToday(this.date);
  }

  nextMonth() {
    this.date = this.calendar.nextMonth();
    this.isToday = this.calendar.isToday(this.date);
  }

  selectMonth(date) {
    this.date = this.calendar.getPerformanceByDate(date);
    this.isToday = this.calendar.isToday(this.date);
  }

  now() {
    this.date = this.calendar.today();
    this.isToday = this.calendar.isToday(this.date);
  }


  changeViewToCalendar() {
    this.viewMode = ScheduleViewModes.CALENDAR;
    if (this.activeComp.listActive) this.activeComp.listActive = false;
    this.activeComp.calendarActive = true;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viewMode', JSON.stringify(this.viewMode));
    }
  }

  changeViewToList() {
    this.viewMode = ScheduleViewModes.LIST;
    if (this.activeComp.calendarActive) this.activeComp.calendarActive = false;
    this.activeComp.listActive = true;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('viewMode', JSON.stringify(this.viewMode));
    }
  }


  get savedLocale() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('viewMode')) || ScheduleViewModes.LIST;
    }

    return ScheduleViewModes.LIST;
  }
}
