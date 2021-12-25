import { Component, OnInit } from '@angular/core';
import { MonthSelectService } from './month-select.service';
import { LangService } from '../../../services/lang.service';

@Component({
  selector: 'app-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.scss']
})
export class MonthSelectComponent implements OnInit {
  nextMonth: Date;
  activeMonth: Date;
  currentMonth: Date;
  localeId: string;

  isListVisible = false;

  constructor(private monthSelectService: MonthSelectService, private langService: LangService) {
    this.currentMonth = new Date();
    this.nextMonth = this.getNextMonthDate(this.currentMonth);

    this.monthSelectService.setMonthData({
      nextMonth: this.nextMonth,
      activeMonth: this.currentMonth,
      currentMonth: this.currentMonth
    });

    this.langService.localeId$.subscribe(localeId => this.localeId = localeId);
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

  formatDate(date: Date) {
    const month =  date.toLocaleString(this.localeId, {month: 'long'});
    const year = date.getFullYear();

    return `${month}, ${year}`;
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
