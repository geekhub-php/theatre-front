import { Injectable } from '@angular/core';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { plainToClass } from 'class-transformer';
import { GatewayService } from '../core/services/gateway.service';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  currentDate: Date;
  daysInWeek = 7;
  Sun = 0;

  events: BehaviorSubject<Array<PerformanceEvent>> = new BehaviorSubject([]);

  constructor(private gateway: GatewayService) {
    this.currentDate = new Date();
  }

  setDate(date: Date) {
    this.currentDate = date;
  }

  getPerformanceEvents() {
    return this.gateway.getSchedulesList(this.dateFrom, this.dateTo)
      .pipe(map((res: ScheduleListResponse) => {
        this.events.next(plainToClass(ScheduleListResponse, res).performance_events);
      })).toPromise();
  }

  get weeks(): Array<Array<Date>> {
    let date: Date = this.dateFrom;
    const endDate = this.dateTo;

    const weeks = [];
    while (endDate > date) {
      const week = [];
      for (let i = 1; i <= this.daysInWeek; i++) {
        week.push(date);
        date = new Date(date);
        date.setDate(date.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  }

  prevMonth(): Date {
    this.currentDate = new Date(this.currentDate);
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.getPerformanceEvents();

    return this.currentDate;
  }

  nextMonth(): Date {
    this.currentDate = new Date(this.currentDate);
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.getPerformanceEvents();

    return this.currentDate;
  }

  today(): Date {
    this.currentDate = new Date();
    this.getPerformanceEvents();

    return this.currentDate;
  }

  get dateFrom() {
    const from = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

    let day: number;
    day = from.getDay();
    if (0 === day) from.setDate(-5); // tslint:disable-line
    else from.setDate(from.getDate() - (day - 1));

    return from;
  }

  get dateTo() {
    let lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    if (this.Sun === lastDay.getDay()) return lastDay;

    lastDay = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, (this.daysInWeek - lastDay.getDay()));

    return lastDay;
  }

  isToday(someDate) {
    const today = new Date();

    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  }
}
