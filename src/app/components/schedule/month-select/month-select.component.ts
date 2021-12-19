import { Component, OnInit } from '@angular/core';
import { MonthSelectService } from './month-select.service';

@Component({
  selector: 'app-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.scss']
})
export class MonthSelectComponent implements OnInit {
  nextMonth: Date;
  activeMonth: Date;
  currentMonth: Date;

  isListVisible = false;

  constructor(private monthSelectService: MonthSelectService) {
    this.currentMonth = new Date();
    this.nextMonth = this.getNextMonthDate(this.currentMonth);

    this.monthSelectService.setMonthData({
      nextMonth: this.nextMonth,
      activeMonth: this.currentMonth,
      currentMonth: this.currentMonth
    });
  }

  ngOnInit() {
    this.monthSelectService.getSelectData().subscribe((data) => {
      this.nextMonth = data.nextMonth;
      this.activeMonth = data.activeMonth;
      this.currentMonth = data.currentMonth;
    });
  }

  setActiveMonth(activeMonth) {
    this.monthSelectService.setMonthData({ activeMonth });
    this.isListVisible = false;
  }

  getNextMonthDate(date: Date) {
    const lastMonth = 11;

    if (date.getMonth() === lastMonth) {
      return new Date(date.getFullYear() + 1, 0);
    } else {
      return new Date(date.getFullYear(), date.getMonth() + 1);
    }
  }
}
