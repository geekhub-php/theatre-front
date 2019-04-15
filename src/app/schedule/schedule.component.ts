import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GatewayService } from '../core/service/gateway.service';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { plainToClass } from 'class-transformer';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';
import { Moment } from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ DatePipe ]
})
export class ScheduleComponent implements OnInit {

  scheduleList: Array<PerformanceEvent>;

  date = new Date();

  moment = require('moment');

  eMoment = this.moment(this.date);

  year = 2019;

  month = 4;

  constructor(private datePipe: DatePipe, private gateway: GatewayService) { }

  transformDate(date) {
    return this.datePipe.transform(date, 'MM-yyyy');
  }

  prevMonth() {
    this.eMoment.subtract(1, 'months');
  }

  nextMonth() {
    this.eMoment.add(1, 'months');
  }

  now() {

  }

  getDates(year: number, month: number) {
    return ['31-03-2019', '04-05-2019'];
  }

  ngOnInit() {
    const [from, to] = this.getDates(this.year, this.month);
    this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
      this.scheduleList = plainToClass(ScheduleListResponse, res).performance_events;
    });
  }
}
