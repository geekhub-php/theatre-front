import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  currentDate: Date;
  daysInWeek = 7;
  Sun = 0;
  constructor() {
    this.currentDate = new Date();
  }

  setDate(date: Date) {
    this.currentDate = date;
  }

  getWeeks(): Array<Array<Date>> {
    let date: Date = this.getFrom();
    const endDate = this.getTo();

    const weeks = []
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

  prevMonth(): CalendarService {
    this.currentDate = new Date(this.currentDate);
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    return this;
  }

  nextMonth(): CalendarService {
    this.currentDate = new Date(this.currentDate);
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    return this;
  }

  today() {
    this.currentDate = new Date();

    return this;
  }

  getFrom() {
    const from = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

    let day: number;
    day = from.getDay();
    if (0 === day) from.setDate(-5); // tslint:disable-line
    else from.setDate(from.getDate() - (day - 1));

    return from;
  }

  getTo() {
    let lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    if (this.Sun === lastDay.getDay()) return lastDay;

    lastDay = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, (this.daysInWeek - lastDay.getDay()));

    return lastDay;
  }
}
