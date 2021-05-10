import { Component, OnInit } from '@angular/core';
import { PerformanceEvent } from '../../../store/schedule/PerformanceEvent';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';
import { MonthsCarouselService } from '../months-carousel/months-carousel.service'

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  events: Array<PerformanceEvent>;
  date: Date;
  currentDate: Date

  constructor(private gateway: GatewayService,
              private slider: MonthsCarouselService,
              private loaderService: LoaderService,
              private calendar: CalendarService) { }

  ngOnInit(): void {
    this.date = this.calendar.currentDate;
    this.calendar.getPerformanceEvents().then(() => this.getPerformanceEvents());
    this.slider.getMonth().subscribe(month => {
      this.currentDate = month.currentFullDate
    })
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendar.events.subscribe((value) => {
      this.events = value.filter(({date_time}) => {
        const resDate = new Date(date_time)
        const monthsEqual = resDate.getMonth() === this.currentDate.getMonth()
        return (resDate >= new Date()) && monthsEqual
    })
      this.loaderService.stop('poster');
    }, err => this.loaderService.stop('poster'));
  }
}
