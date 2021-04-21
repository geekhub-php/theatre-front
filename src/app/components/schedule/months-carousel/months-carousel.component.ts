import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { NguCarouselConfig } from "@ngu/carousel";

@Component({
  selector: 'app-months-carousel',
  templateUrl: './months-carousel.component.html',
  styleUrls: ['./months-carousel.component.scss']
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
    index = this.currentSize === 'xl' ? index - 2 : index - 1;

    let difference = index - this.currentIndex;
    let count = 0;
    if (difference > 0) {
      difference = Math.abs(difference);
      do {
        this.onNext();
        count++;
      } while (count < difference);
    } else if (difference < 0) {
      difference = Math.abs(difference);
      do {
        this.onPrev();
        count++;
      } while (count < difference);
    }

    if (index === -1) index = 11;
    if (index === -2) index = 10;
    if (index === 12) index = 0;
    if (index === 13) index = 1;

    this.currentIndex = index;

    return index;
  }

  public activeMonth(index: number) {
    if (this.currentSize === 'xl') return index === (this.currentIndex + 2);
    return index === (this.currentIndex + 1);
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.onResize();
  }

  @HostListener('window:resize') onResize() {
    const innerWidth = window.innerWidth;
    const xlBreakPoint = 1200;
    const mdBreakPoint = 767;

    if ((innerWidth >= xlBreakPoint) && !(this.currentSize === 'xl')) {
      this.currentSize = 'xl';
      this.setIndexes(1);
    } else if ((innerWidth >= mdBreakPoint && innerWidth < xlBreakPoint) && !(this.currentSize === 'md')) {
      this.currentSize = 'md';
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

  // setStartIndex(size) {
  //   console.log(size);
  //   switch (size) {
  //     case 'xl' :
  //       this.currentIndex = 0;
  //       break;
  //     case 'md' :
  //       this.currentIndex = 0;
  //       break;
  //     default:
  //       this.currentIndex = 0;
  //       break;
  //   }
  // }

  ngOnInit() {
  }

  setIndexes(positionDependency: number) {
    this.currentNumberOfMonth = Number(this.currentMonth) - positionDependency;
    this.currentIndex = this.currentNumberOfMonth;
    setTimeout(() => {
      this.carousel.moveTo(this.currentNumberOfMonth);
    });
  }

  ngAfterViewInit() {
    //preventing After Init Error
    setTimeout(() => {
      this.setIndexes(1);
    });
  }
}
