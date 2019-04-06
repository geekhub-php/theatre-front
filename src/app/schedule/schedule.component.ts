import { Component, OnInit } from '@angular/core';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  scheduleList: Array<PerformanceEvent>;

  constructor(private gateway: GatewayService) {
    const [from, to] = this.getDates(2019, 4);
    this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
      this.scheduleList = res.performance_events;
    });
  }

  ngOnInit() {
  }

  getDates(year: number, month: number) {
    // black magic
    return ['31-03-2019', '04-05-2019'];
  }
}
