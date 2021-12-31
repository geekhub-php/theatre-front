import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMonthSelect {
  nextMonth: Date;
  activeMonth: Date;
  currentMonth: Date;
}

@Injectable({
  providedIn: 'root'
})

export class MonthSelectService {
  monthSelect$ = new BehaviorSubject<IMonthSelect>({
    nextMonth: null,
    activeMonth: null,
    currentMonth: null
  });

  constructor() { }

  setMonthData({
                 nextMonth = this.monthSelect$.value.nextMonth,
                 activeMonth = this.monthSelect$.value.activeMonth,
                 currentMonth = this.monthSelect$.value.currentMonth
  }) {
    this.monthSelect$.next({ activeMonth, currentMonth, nextMonth });
  }

  getSelectData() {
    return this.monthSelect$.asObservable();
  }
}
