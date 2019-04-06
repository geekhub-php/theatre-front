import { Component, OnInit } from '@angular/core';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleList: Array<PerformanceEvent>;

  constructor(private gateway: GatewayService) {
    // const [from, to] = this.getDates(2019, 4);
    // this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
    //   this.scheduleList = res.performance_events;
    // });
  }

  ngOnInit() {
    const [from, to] = this.getDates(2019, 4);
    this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
      this.scheduleList = res.performance_events;

      console.log(res);
      console.log(plainToClass(ScheduleListResponse, res));

    });

  }
}
