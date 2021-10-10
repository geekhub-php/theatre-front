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
} from '@angular/core';
import {
  TSliderMonth,
  TMonthProperty,
  TNativeDivElement
} from 'app/store/schedule/MonthsSliderItem';
import { MonthsCarouselService } from './months-carousel.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LangService } from '../../../services/lang.service';

@Component({
  selector: 'app-months-carousel',
  templateUrl: './months-carousel.component.html',
  styleUrls: [ './months-carousel.component.scss' ],
  changeDetection: ChangeDetectionStrategy.Default
})

export class MonthsCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() selectedMonth = new EventEmitter();

  @ViewChild('activeBox') activeBox: TNativeDivElement;
  @ViewChild('monthsSlider') monthsSlider: TNativeDivElement;
  @ViewChildren('monthItem') monthItems: QueryList<TNativeDivElement>;

  monthsList: Array<TSliderMonth> = [];

  monthsSliderSubscription: Subscription;
  monthSubscription: Subscription;
  activeMonthSubscription: Subscription;

  isSpinnerActive = false;
  month: TMonthProperty;
  activeMonth = {id: ''};

  deviceType: string | null = null;

  monthsNameList = {
    uk: [
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
    en: [
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
    private langService: LangService,
    private carousel: MonthsCarouselService,
    private deviceService: DeviceDetectorService,
  ) {
    this.langService.localeId$.subscribe(localeId => {
      this.monthsList = this.carousel.createMonthList(this.monthsNameList[localeId]);
    });
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
    this.setDeviceType();
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

  setDeviceType() {
    this.deviceType = this.deviceService.getDeviceInfo().deviceType;
  }

  unSubscribe() {
    this.monthSubscription.unsubscribe();
    this.activeMonthSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unSubscribe();
  }
}
