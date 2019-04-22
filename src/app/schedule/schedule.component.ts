import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GatewayService } from '../core/service/gateway.service';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { plainToClass } from 'class-transformer';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';
import { LoaderService } from '../shared/spinner/loader.service';
import { CalendarService } from './calendar.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ DatePipe ]
})
export class ScheduleComponent implements OnInit {

  scheduleList: Array<PerformanceEvent>;
  dayPerformances: Array<PerformanceEvent>;
  date: Date;
  weeks: Array<Array<Date>>;
  collapse = true;

  constructor(
    private datePipe: DatePipe,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private calendar: CalendarService,
    private router: Router
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);
  }

  toggleElement() {
    this.collapse =!this.collapse;
    console.dir(this.collapse);
  }


  ngOnInit() {
    this.date = new Date();
    this.getPerformanceEvents();
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'MM-yyyy');
  }

  hasPerformanceByDate(date: Date): boolean {
    this.dayPerformances = this.getPerformancesByDate(date);

    return this.dayPerformances.length > 0;
  }

  getPerformancesByDate(date: Date): Array<PerformanceEvent> {
    if (!this.scheduleList) return [];

    return this.scheduleList.filter((event: PerformanceEvent) => {
      return +event.month === date.getMonth() + 1
        && +event.day === date.getDate();
    });
  }

  prevMonth() {
    this.date = new Date(this.date);
    this.date.setMonth(this.date.getMonth() - 1);

    this.getPerformanceEvents();

  }

  nextMonth() {
    this.date = new Date(this.date);
    this.date.setMonth(this.date.getMonth() + 1);

    this.getPerformanceEvents();
  }

  now() {
    this.date = new Date();

    this.getPerformanceEvents();
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendar.setDate(this.date);
    this.weeks = this.calendar.getWeeks();
    const from = this.calendar.getFrom();
    const to = this.calendar.getTo();

    this.gateway.getSchedulesList(from, to).subscribe(
      (res: ScheduleListResponse) => {
        this.scheduleList = plainToClass(ScheduleListResponse, res).performance_events;
        this.loaderService.stop('poster');
      },
      err => this.loaderService.stop('poster')
    );
  }

}
