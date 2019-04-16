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

  date = new Date('April 15, 2019');

   // year = this.date.setFullYear(2019);
   // dayOfWeek = (this.date.getDay() + 6)% 7;

  month = 4;

  year = 2019;

  constructor(private datePipe: DatePipe, private gateway: GatewayService, private loaderService: LoaderService) { }

  transformDate(date) {
    return this.datePipe.transform(date, 'MM-yyyy');
  }

  prevMonth(event: any) {
    this.date = new Date();
    this.date.setMonth(this.date.getMonth() - 1);
  }

  nextMonth(event: any) {
    this.date = new Date();
    this.date.setMonth(this.date.getMonth() + 1);
  }

  now(event: any) {
    this.date = new Date();
    return this.month;
  }

  getDates(year: number, month: number) {
    return ['31-03-2019', '04-05-2019'];
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
