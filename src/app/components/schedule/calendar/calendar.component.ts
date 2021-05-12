import { Component, OnInit } from '@angular/core';
import { PerformanceEvent } from '../../../store/schedule/PerformanceEvent';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: Array<PerformanceEvent>;
  dayPerformances: Array<PerformanceEvent>;
  weeks: Array<Array<Date>>;
  date: Date;

  constructor(private gateway: GatewayService,
              private loaderService: LoaderService,
              private calendar: CalendarService) { }

  ngOnInit(): void {
    this.calendar.getPerformanceEvents().then(() => this.getPerformanceEvents());
  }

  hasPerformanceByDate(date: Date): boolean {
    this.dayPerformances = this.getPerformancesByDate(date);

    return this.dayPerformances.length > 0;
  }

  getPerformancesByDate(date: Date): Array<PerformanceEvent> {
    if (!this.events) return [];

    return this.events.filter((event: PerformanceEvent) => {
      return +event.month === date.getMonth() + 1 && +event.day === date.getDate();
    });
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendar.events.subscribe((value) => {
      this.events = value;
      this.weeks = this.calendar.weeks;
      this.loaderService.stop('poster');
    }, err => this.loaderService.stop('poster'));
  }
}
