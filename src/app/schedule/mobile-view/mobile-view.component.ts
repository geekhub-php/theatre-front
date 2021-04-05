import { Component, OnInit } from '@angular/core';
import { PerformanceEvent } from '../../core/model/schedule/PerformanceEvent';
import { GatewayService } from '../../core/services/gateway.service';
import { LoaderService } from '../../shared/spinner/loader.service';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent implements OnInit {

  events: Array<PerformanceEvent>;
  date: Date;

  constructor(private gateway: GatewayService,
              private loaderService: LoaderService,
              private calendar: CalendarService) { }

  ngOnInit(): void {
    this.date = this.calendar.currentDate;

    this.calendar.getPerformanceEvents().then(() => this.getPerformanceEvents());
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');

    this.calendar.events.subscribe((value) => {
      this.events = value.filter(({date_time}) => new Date(date_time) >= new Date());
      this.loaderService.stop('poster');
    }, err => this.loaderService.stop('poster'));
  }
}
