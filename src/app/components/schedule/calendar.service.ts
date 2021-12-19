import { Injectable } from '@angular/core';

import { GatewayService } from '../../services/gateway.service';

import { PerformanceEvent } from '../../store/schedule/PerformanceEvent';

import { BehaviorSubject } from 'rxjs';
import { MonthSelectService } from './month-select/month-select.service';

interface IPerformanceEvents {
  nextMonth: Date;
  activeMonth: Date;
  currentMonth: Date;
  nextEvents: Array<PerformanceEvent>;
  currentEvents: Array<PerformanceEvent>;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  Sun = 0;
  daysInWeek = 7;
  nextMonth: Date;
  currentMonth: Date;

  eventsData = new BehaviorSubject<IPerformanceEvents>({
    nextEvents: null, currentEvents: null, activeMonth: null, nextMonth: null, currentMonth: null
  });

  constructor(private gateway: GatewayService, private monthSelectService: MonthSelectService) {
    this.monthSelectService.getSelectData().subscribe(({ currentMonth, nextMonth, activeMonth }) => {
      this.nextMonth = nextMonth;
      this.currentMonth = currentMonth;
      this.eventsData.next({ ...this.eventsData.value, currentMonth, nextMonth, activeMonth });
    });
  }

  getPerformanceEvents() {
    this.gateway.getSchedulesList(this.dateFrom(this.currentMonth), this.dateTo(this.currentMonth)).subscribe(res => {
      const currentEvents = res.performance_events;
      this.eventsData.next({ ...this.eventsData.value, currentEvents });
      this.openNextMonth();
    });
    this.gateway.getSchedulesList(this.dateFrom(this.nextMonth), this.dateTo(this.nextMonth)).subscribe(res => {
      const nextEvents = res.performance_events;
      this.eventsData.next({ ...this.eventsData.value, nextEvents });
      this.openNextMonth();
    });
  }

  openNextMonth() {
    const { currentEvents, nextEvents, nextMonth } = this.eventsData.value;

    if (currentEvents && nextEvents && nextMonth) {
      if (!currentEvents.length && nextEvents.length) {
        this.monthSelectService.setMonthData({ activeMonth: nextMonth });
      }
    }
  }

  setDate(date: Date) {
    this.currentMonth = date;
  }

  weeks(currentDate): Array<Array<Date>> {
    let date: Date = this.dateFrom(currentDate);
    const endDate = this.dateTo(currentDate);

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

  dateFrom(date) {
    const from = new Date(date?.getFullYear(), date?.getMonth(), 1);

    let day: number;
    day = from.getDay();
    if (0 === day) from.setDate(-5); // tslint:disable-line
    else from.setDate(from.getDate() - (day - 1));

    return from;
  }

  dateTo(date) {
    let lastDay = new Date(date?.getFullYear(), +date?.getMonth() + 1, 0);

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
