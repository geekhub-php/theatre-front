import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { PerformanceEvent } from '../../../store/schedule/PerformanceEvent';
import { LoaderService } from '../../partials/spinner/loader.service';
import { CalendarService } from '../calendar.service';
import { MonthsCarouselService } from '../months-carousel/months-carousel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {

  events: Array<PerformanceEvent> = [];
  date: Date;
  currentDate: Date;
  sliderSubscription: Subscription;
  calendarSubscription: Subscription;
  loaderSubscription: Subscription;
  loader: boolean;

  constructor(private slider: MonthsCarouselService,
              private loaderService: LoaderService,
              private calendar: CalendarService,
              @Inject(LOCALE_ID) private localeId: string) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);
    this.loaderSubscription = this.loaderService.subject.subscribe(spinner => {
      this.loader = spinner.load;
    });
  }

  ngOnInit() {
    this.getMonth();
    this.slider.setActiveMonth();
    this.calendar.getPerformanceEvents()
      .then(() => this.getPerformanceEvents()
    );
  }

  getMonth() {
    this.sliderSubscription = this.slider.getMonth().subscribe(month => {
      this.currentDate = month.currentFullDate;
    });
  }

  getPerformanceEvents() {
    this.loaderService.start('poster');
    this.calendarSubscription = this.calendar.events.subscribe((value) => {
      this.events = value.filter(({date_time}) => {
        const resDate = new Date(date_time);
      if (resDate) {
        const monthsEqual = resDate.getMonth() === this.currentDate.getMonth();

        return (resDate >= new Date()) && monthsEqual;
      }
    });
      this.loaderService.stop('poster');
    }, err => this.loaderService.stop('poster'));
  }

  delSubscription(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.delSubscription(this.sliderSubscription);
    this.delSubscription(this.calendarSubscription);
    this.delSubscription(this.loaderSubscription);
  }
}
