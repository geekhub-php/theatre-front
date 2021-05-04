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
  styleUrls: ['./months-carousel.component.scss'],
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
    this.getMonthsList();
    // for English version
    this.carousel.createMonthList(this.monthsNameList.monthsEng);
    // for Ukrainian version
    // this.carousel.createMonthList(this.monthsNameList.months)
  }

  @HostListener('mousewheel', ['$event']) onScroll(event) {
    event.preventDefault();
    this.carousel.onMouseWheel(event);
  }

  @HostListener('window:resize') onResize() {
    this.carousel.onResize();
  }

  getCarousel() {
    this.monthsSliderSubscription = this.carousel.getCarousel().subscribe(carousel => {
      this.monthsSlider = carousel;
    });
  }

  getMonthsList() {
    this.monthsListSubscription = this.carousel.getMonthsList().subscribe(monthsList => {
      this.monthsList = monthsList;
    });
  }

  getMonth() {
    this.monthSubscription = this.carousel.getMonth().subscribe(month => {
      this.month = month;
      this.selectedMonth.emit(this.month.currentFullDate);
    });
  }

  ngOnInit() {
    this.getCarousel();
    this.getMonth();
    this.carousel.setDefaultData();
  }

  onPrev(event) {
    event.stopPropagation();
    this.carousel.onPrev(event);
  }

  onNext(event) {
    event.stopPropagation();
    this.carousel.onNext(event);
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
    this.monthsSliderSubscription.unsubscribe();
    this.monthsListSubscription.unsubscribe();
    this.monthSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unSubscribe();
  }
}
