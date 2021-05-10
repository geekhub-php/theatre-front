import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChildren,
  ViewChild,
  QueryList,
  OnDestroy,
  OnInit,
  Output,
  Component,
  HostListener,
  EventEmitter
} from '@angular/core';
import {
  TSliderMonth,
  TMonthProperty,
  TMonthsSliderElement
} from '../../../store/schedule/MonthsSliderItem';
import { MonthsCarouselService } from './months-carousel.service';

@Component({
  selector: 'app-months-carousel',
  templateUrl: './months-carousel.component.html',
  styleUrls: [ './months-carousel.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MonthsCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() selectedMonth = new EventEmitter();

  @ViewChild('monthsSlider') monthsSlider: TMonthsSliderElement;
  @ViewChildren('monthItem') monthItems: QueryList<TMonthsSliderElement>;

  monthsList: Array<TSliderMonth> = [];

  monthsListSubscription: Subscription;
  monthsSliderSubscription: Subscription;
  monthSubscription: Subscription;

  isSpinnerActive = false;
  month: TMonthProperty;

  monthsNameList = {
    months: [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень'
    ],
    monthsEng: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  };

  constructor(
    private cd: ChangeDetectorRef,
    private carousel: MonthsCarouselService
  ) {
    // this.getMonthsList();
    // for EN version
    this.monthsList = this.carousel.createMonthList(this.monthsNameList.monthsEng);
    // for UK version
    // this.carousel.createMonthList(this.monthsNameList.months)
  }

  @HostListener('window:resize') onResize() {
    this.carousel.onResize();
  }

  getMonth() {
    this.monthSubscription = this.carousel.getMonth().subscribe(month => {
      this.month = month;
      this.selectedMonth.emit(month.currentFullDate);
    });
  }

  setActiveMonth() {
    this.carousel.getCurrentMonth().subscribe(currentMonth => {
      // this.selectedMonth.emit(currentMonth);
    });
  }

  ngOnInit() {
    this.getMonth();
    this.setActiveMonth();
    this.carousel.setDefaultData();
  }

  onPrev(event) {
    event.stopPropagation();
    this.carousel.onPrev();
  }

  onNext(event) {
    event.stopPropagation();
    this.carousel.onNext();
  }

  ngAfterViewInit() {
    this.carousel.setCarousel(this.monthsSlider);
    this.carousel.setQueryMonthsList(this.monthItems);
    this.carousel.setScreenWidth(this.monthsSlider.nativeElement.scrollWidth);
    this.carousel.scrollToCurrentMonth();
    this.carousel.onDrag();
    this.cd.detectChanges();
  }

  unSubscribe() {
    this.monthsListSubscription.unsubscribe();
    this.monthSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unSubscribe();
  }
}
