import { fromEvent, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable, QueryList } from '@angular/core';
import {
  TMonthProperty,
  TMonthsSliderElement,
  TScreenProperty,
  TSliderMonth
} from 'app/store/schedule/MonthsSliderItem';
import { LoaderService } from 'app/components/partials/spinner/loader.service';

@Injectable({
  providedIn: 'root'
})
export class MonthsCarouselService {
  private monthsSlider$ = new Subject<TMonthsSliderElement>();
  private monthsList$ = new Subject<Array<TSliderMonth>>();
  private month$ = new Subject<TMonthProperty>();

  private monthsSlider: TMonthsSliderElement;
  private queryMonthList = [];

  private monthList: Array<TSliderMonth> = [];
  private onDrug$: Subscription;
  private isSpinnerActive = false;

  private screen: TScreenProperty = {
    fullScreen: true,
    scrollWidth: 0,
    startPoint: 0,
    scrollAmount: 600,
    screenWidth: 1500,
    currentPosition: 0,
    scrollStep: 300,
    wideScrollStep: 600,
    wideScreen: 1500,
    narrowScreen: 1200
  };

  private month: TMonthProperty = {
    activeMonth: null,
    currentFullDate: new Date(),
    amountOfYears: 150
  };

  constructor(private spinner: LoaderService) {
    this.monthsSlider$.subscribe(carousel => {
      this.monthsSlider = carousel;
    });
    this.spinner.subject.subscribe(data => {
      this.isSpinnerActive = data.load;
    });
  }

  getCarousel() {
    return this.monthsSlider$.asObservable();
  }

  getMonthsList() {
    return this.monthsList$.asObservable();
  }

  getMonth() {
    return this.month$.asObservable();
  }

  setCarousel(carousel: TMonthsSliderElement) {
    this.monthsSlider$.next(carousel);
  }

  setQueryMonthsList(monthItems: QueryList<TMonthsSliderElement>) {
    this.queryMonthList = monthItems.toArray();
  }

  setScreenWidth(scrollWidth) {
    this.screen = { ...this.screen, scrollWidth };
  }

  onResize() {
    const { wideScreen, narrowScreen, fullScreen, scrollStep, wideScrollStep } = this.screen;
    const width = window.innerWidth;

    if (!(width >= wideScreen && fullScreen) && !(width < wideScreen && !fullScreen)) {
      width >= wideScreen ? this.screen.fullScreen = true : this.screen.fullScreen = false;
      this.screen.screenWidth = this.screen.fullScreen ? wideScreen : narrowScreen;
      this.screen.startPoint = this.screen.fullScreen ? 0 : scrollStep;
      this.screen.scrollAmount = this.screen.fullScreen ? wideScrollStep : scrollStep;
      this.scrollToCurrentMonth();
    }
  }

  checkPosition() {
    if (this.screen.currentPosition < this.screen.startPoint) {
      this.screen.currentPosition = this.screen.startPoint;
    } else if (this.screen.currentPosition > this.screen.scrollWidth - this.screen.screenWidth) {
      this.screen.currentPosition = this.screen.scrollWidth - this.screen.screenWidth;
    }
  }

  setDefaultData() {
    const {amountOfYears} = this.month;
    const newDate = new Date();
    const half =  2;
    this.month.activeMonth = `${newDate.getUTCMonth()}/${newDate.getUTCFullYear()}/${amountOfYears / half}`;
    this.spinner.subject.subscribe(data => {
      this.isSpinnerActive = data.load;
    });
    this.onResize();
    this.month$.next(this.month);
  }

  createMonthList(monthLng: Array<string>) {
    let newMonthList: Array<TSliderMonth> = [];
    const monthCreator = (date, name, id): TSliderMonth => ({ date, name, id });
    const { amountOfYears } = this.month;
    const middleDate = 15;

    for (let i = 0; i < amountOfYears; i++) {
      monthLng.forEach((name, j) => {
        const date = new Date();
        date.setDate(middleDate);
        date.setMonth(j);
        newMonthList = [
          ...newMonthList, monthCreator(date, name, `${date.getUTCMonth()}/${date.getUTCFullYear()}/${i}`)
        ];
      });
      this.monthList = [...this.monthList, ...newMonthList];
      newMonthList = [];
    }
    const penultimateMonthCount = 2;

    this.monthList = [
      monthCreator(new Date(), monthLng[monthLng.length - penultimateMonthCount], Date.now().toString()),
      monthCreator(new Date(), monthLng[monthLng.length - 1], Date.now().toString()),
      ...this.monthList,
      monthCreator(new Date(), monthLng[0], Date.now().toString()),
      monthCreator(new Date(), monthLng[1], Date.now().toString())
    ];
    this.monthsList$.next(this.monthList);
    this.setActiveMonth(this.month.activeMonth);
  }

  calcMonthPosition(currentPosition: number, deltaY) {
    const { scrollStep } = this.screen;
    const direction = deltaY > 0 ? scrollStep : deltaY < 0 ? -scrollStep : 0;

    if (!!direction) {
      currentPosition = currentPosition + direction;
      const remainder = currentPosition % scrollStep;

      return remainder === 0 ? currentPosition : currentPosition - remainder + scrollStep;
    }
  }

  scrollToCurrentMonth() {
    this.queryMonthList.forEach(month => {
      month = month.nativeElement;
      if (this.month.activeMonth === month.firstChild.id) {
        this.screen.currentPosition = month.offsetLeft - this.screen.scrollAmount;
        this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
        this.getMonthData(month.firstChild.id);
        this.setActiveMonth(month.firstChild.id);
      }
    });
  }

  getMonthData(id) {
    this.monthList.forEach(month => {
      if (month.id === id) {
        this.month.currentFullDate = month.date;
        this.activeSpinner();
      }
    });
    this.month$.next(this.month);
  }

  activeSpinner() {
    if (!this.isSpinnerActive) {
      this.spinner.start('poster');
    }
  }
  stopSpinner() {
    if (this.isSpinnerActive) {
      this.spinner.stop('poster');
    }
  }

  onPrev(event) {
    event.stopPropagation();
    if (!(this.monthsSlider.nativeElement.scrollLeft <= this.screen.startPoint)) {
      this.screen.currentPosition -= this.screen.scrollStep;
      this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
      this.setActiveMonth();
      this.activeSpinner();
    }
  }

  onNext(event) {
    event.stopPropagation();
    if (!(this.screen.scrollWidth - this.monthsSlider.nativeElement.scrollLeft <= this.screen.screenWidth)) {
      this.screen.currentPosition += this.screen.scrollStep;
      this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
      this.setActiveMonth();
      this.activeSpinner();
    }
  }

  onDrag() {
    const mousedown$ = fromEvent<any>(this.monthsSlider.nativeElement, 'mousedown');
    const mouseup$ = fromEvent<any>(document, 'mouseup');

    let startPos = 0;
    const tagData = { name: '', id: '' };

    const onEnd = () => mouseup$.pipe(map(event => startPos - event.clientX));

    this.onDrug$ = mousedown$.pipe(
      map(event => {
        event.stopPropagation();
        tagData.name = event.target.localName;
        tagData.id = event.target.id;
        startPos = event.clientX;
      }),
      switchMap(onEnd)
    ).subscribe((leftPosition) => {
      if (tagData.name !== 'span') {
        return;
      }
      // 50 - reserve count if user's hand shuddered when he wanted click
      const minCountForClick = 50;

      if (Math.abs(leftPosition) < minCountForClick) {
        this.queryMonthList.forEach(el => {
          if (el.nativeElement.firstChild.id === tagData.id) {
            if (!isNaN(Number(tagData.id))) {
              this.stopSpinner();

              return;
            }
            this.screen.currentPosition = el.nativeElement.offsetLeft - this.screen.scrollAmount;
            this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
            this.setActiveMonth(tagData.id);
            this.activeSpinner();
          }
        });
      } else {
        // scrollSpeed for increasing scroll speed
        const scrollSpeed = 2;
        const { scrollStep } = this.screen;

        leftPosition *= scrollSpeed;
        const reminder = leftPosition % scrollStep;
        if (reminder !== 0) {
          leftPosition = (leftPosition > 0 ? leftPosition + scrollStep : leftPosition - scrollStep) - reminder;
        }
        this.screen.currentPosition = this.screen.currentPosition + leftPosition;
        this.checkPosition();
        this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
        this.setActiveMonth();
        this.activeSpinner();
      }
      tagData.name = '';
      tagData.id = '';
    });
  }

  setActiveMonth(id?) {
    this.queryMonthList.forEach(el => {
      if (id) {
        if (el.nativeElement.firstChild.id === id) {
          this.month.activeMonth = id;
        }
      } else if ((el.nativeElement.offsetLeft) === (this.screen.currentPosition + this.screen.scrollAmount)) {
        if (!isNaN(Number(el.nativeElement.firstChild.id))) {
          return;
        }
        this.month.activeMonth = el.nativeElement.firstChild.id;
      }
    });
    this.month$.next(this.month);
    this.getMonthData(this.month.activeMonth);
  }
}
