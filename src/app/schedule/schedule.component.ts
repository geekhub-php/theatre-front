import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GatewayService } from '../core/service/gateway.service';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { plainToClass } from 'class-transformer';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ DatePipe ]
})
export class ScheduleComponent implements OnInit {

  scheduleList: Array<PerformanceEvent>;

  date = new Date('April 19, 2019');

  month =  4;

  year = 2019;

  day = this.date.getDate();

  newDay = new Date(this.date);

  constructor(private datePipe: DatePipe, private gateway: GatewayService, private loaderService: LoaderService) { }

  transformDate(date) {
    return this.datePipe.transform(date, 'MM-yyyy');
  }

   addDays(date, days) {
    this.newDay = new Date(date);
    this.newDay.setDate(this.newDay.getDate() + 1);

    return Date;
  }

  prevMonth(event: any) {
    this.date = new Date(this.date);
    this.date.setMonth(this.date.getMonth() - 1);

    return Date;

  }

  nextMonth(event: any) {
    this.date = new Date(this.date);
    this.date.setMonth(this.date.getMonth() + 1);

    return Date;
  }

  now(event: any) {
    this.date = new Date();

    return this.month;
  }

  getDates(year: number, month: number) {

    return ['01-04-2019', '05-05-2019'];
  }

  ngOnInit() {
    this.loaderService.start('poster');
    const [from, to] = this.getDates(this.year, this.month);
    this.gateway.getSchedulesList(from, to).subscribe(
      (res: ScheduleListResponse) => {
        this.scheduleList = plainToClass(ScheduleListResponse, res).performance_events;
        this.loaderService.stop('poster');
      },
      err => this.loaderService.stop('poster')
    );
  }
}
