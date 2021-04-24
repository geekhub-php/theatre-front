import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { NguCarouselConfig } from "@ngu/carousel";

@Component({
  selector: 'app-months-carousel',
  templateUrl: './months-carousel.component.html',
  styleUrls: ['./months-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthsCarouselComponent implements AfterViewInit {
  @Input() onNextMonth;
  @Input() onPrevMonth;
  @Input() currentMonth;

  @ViewChild('myCarousel') carousel;

  public months = [
    'Листопад',
    'Грудень',
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
    'Грудень',
    'Січень',
    'Лютий',
  ];

  public monthsEng = [
    'November',
    'December',
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
    'December',
    'January',
    'February',
  ];

  public currentSize: string;
  public currentIndex: number;
  public currentNumberOfMonth: number;


  public selectMonth(index: number) {
    index -= this.currentSize === 'xl' ? 2 : 1;

    const changeSlide = (onChangeSlide) => {
      let count = 0;
      difference = Math.abs(difference);
      while (count < difference) {
        onChangeSlide();
        count++;
      }
    };

    let difference = index - this.currentIndex;
    if (difference) {
      changeSlide(difference > 0 ? this.onNext.bind(this) : this.onPrev.bind(this));
      difference = Math.abs(difference);
    }
    // make it with if else
    if (index === -1) index = 11;
    if (index === -2) index = 10;
    if (index === 12) index = 0;
    if (index === 13) index = 1;
    this.currentIndex = index;

    return index;
  }

  public activeMonth(index: number) {
    return index === (this.currentIndex + (this.currentSize === 'xl' ? 2 : 1));
  }

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, xl: 5, all: 0 },
    slide: 1,
    speed: 250,
    point: {
      visible: true,
    },
    load: 10,
    velocity: 0,
    touch: false,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    loop: true,
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cd: ChangeDetectorRef
  ) {
    // this.onResize();
  }

  @HostListener('window:resize') onResize() {
    const innerWidth = window.innerWidth;
    const xlBreakPoint = 1200;
    const mdBreakPoint = 767;

    if ((innerWidth >= xlBreakPoint) && !(this.currentSize === 'xl')) {
      this.currentSize = 'xl'
      console.log(2131)
      this.setIndexes(1);
    } else if ((innerWidth >= mdBreakPoint && innerWidth < xlBreakPoint) && !(this.currentSize === 'md')) {
      this.currentSize = 'md';
      console.log(345346)
      this.setIndexes(0);
    }
  }

  onNext() {
    this.onNextMonth();
  }

  onPrev() {
    this.onPrevMonth();
  }

  onMove(activePoint, carousel) {
    this.carousel = carousel;
    this.currentIndex = activePoint;
  }

  ngOnInit() {
  }

  setIndexes(positionDependency: number) {
    this.currentNumberOfMonth = Number(this.currentMonth) - positionDependency;
    this.currentIndex = this.currentNumberOfMonth;
    this.carousel.moveTo(this.currentNumberOfMonth);
  }

  ngAfterViewInit() {
    //preventing After Init Error
    this.onResize();
    this.cd.detectChanges();
  }
}
