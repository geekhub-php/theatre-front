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
  EventEmitter,
  Inject,
  LOCALE_ID
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
  changeDetection: ChangeDetectionStrategy.Default
})

export class MonthsCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() selectedMonth = new EventEmitter();

  @ViewChild('activeBox') activeBox: TMonthsSliderElement;
  @ViewChild('monthsSlider') monthsSlider: TMonthsSliderElement;
  @ViewChildren('monthItem') monthItems: QueryList<TMonthsSliderElement>;

  monthsList: Array<TSliderMonth> = [];

  monthsSliderSubscription: Subscription;
  monthSubscription: Subscription;
  activeMonthSubscription: Subscription;

  isSpinnerActive = false;
  month: TMonthProperty;
  activeMonth = {id: ''};

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
    private carousel: MonthsCarouselService,
    @Inject(LOCALE_ID) private localeId: string,
  ) {
    this.localeId === 'en-US' ? this.monthsList = this.carousel.createMonthList(this.monthsNameList.monthsEng)
    : this.monthsList = this.carousel.createMonthList(this.monthsNameList.months);
  }

  @HostListener('window:resize') onResize() {
    this.carousel.onResize();
  }

  getMonth() {
    this.monthSubscription = this.carousel.getMonth().subscribe(month => {
      this.month = month;
      this.selectedMonth.emit();
    });
  }

  getActiveMonth() {
   this.activeMonthSubscription = this.carousel.getActiveMonth().subscribe(activeMonth => {
     this.activeMonth = activeMonth;
    });
  }

  ngOnInit() {
    this.getMonth();
    this.getActiveMonth();
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
    this.carousel.setActiveBox(this.activeBox);
    this.carousel.setScreenWidth(this.monthsSlider.nativeElement.scrollWidth);
    this.carousel.scrollToCurrentMonth();
    this.carousel.onDrag();
    this.cd.detectChanges();
  }

  unSubscribe() {
    this.monthSubscription.unsubscribe();
    this.activeMonthSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unSubscribe();
  }
}
