import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleListResponse } from '../core/model/schedule/ScheduleListResponse';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceEvent } from '../core/model/schedule/PerformanceEvent';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  scheduleList: Array<PerformanceEvent>;

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
  }
}
