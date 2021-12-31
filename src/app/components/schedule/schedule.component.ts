import {
  OnInit,
  OnDestroy,
  Component,
  HostListener,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Breakpoints } from 'app/constants';
import { CalendarService } from './calendar.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GatewayService } from 'app/services/gateway.service';
import { WindowRefService } from 'app/services/window-ref.service';
import { LoaderService } from '../partials/spinner/loader.service';


export enum ScheduleViewModes {
  LIST = 'List',
  CALENDAR = 'Calendar',
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date: Date;
  isDesktop = true;
  isToday: boolean;
  isSwitcherActive = false;
  views = ScheduleViewModes;
  sliderSubscription: Subscription;
  viewMode: ScheduleViewModes = ScheduleViewModes.LIST;

  activeComp = {
    listActive: true,
    calendarActive: false
  };

  constructor(
    private gateway: GatewayService,
    private calendar: CalendarService,
    private windowRef: WindowRefService,
    private loaderService: LoaderService,
    private deviceService: DeviceDetectorService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.windowRef.isPlatformBrowser) {
      const calendarBreakpointWidth = Breakpoints.xl_min;
      const innerWidth = this.windowRef.nativeWindow.innerWidth;

      this.isSwitcherActive = innerWidth > calendarBreakpointWidth;
      this.isSwitcherActive && this.viewMode === ScheduleViewModes.CALENDAR ? this.changeViewToCalendar() : this.changeViewToList();

      this.isDesktop = this.deviceService.getDeviceInfo().deviceType === 'desktop';

      if (!this.isDesktop) {
        this.viewMode = ScheduleViewModes.LIST;
      }
    }
  }

  ngOnInit() {
    this.loaderService.start('poster');
    this.viewMode = this.savedLocale;
    this.onResize();
    this.gateway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Афіша Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
    this.gateway.updateCanonicalURL();
    this.setViewMode();
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
    if (this.windowRef.isPlatformBrowser) {
      localStorage.setItem('viewMode', JSON.stringify(this.viewMode));
    }
  }

  changeViewToList() {
    this.viewMode = ScheduleViewModes.LIST;
    if (this.activeComp.calendarActive) this.activeComp.calendarActive = false;
    this.activeComp.listActive = true;

    if (this.windowRef.isPlatformBrowser) {
      localStorage.setItem('viewMode', JSON.stringify(this.viewMode));
    }
  }

  delSubscription(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.delSubscription(this.sliderSubscription);
  }

  get savedLocale() {
    if (this.windowRef.isPlatformBrowser) {
      return JSON.parse(localStorage.getItem('viewMode')) || ScheduleViewModes.LIST;
    }

    return ScheduleViewModes.LIST;
  }
}
