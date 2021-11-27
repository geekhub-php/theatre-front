import { fromEvent, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Inject, Injectable, OnDestroy, QueryList } from '@angular/core';
import {
  TMonthProperty,
  TNativeDivElement,
  TScreenProperty,
  TSliderMonth
} from 'app/store/schedule/MonthsSliderItem';
import { LoaderService } from 'app/components/partials/spinner/loader.service';

import { DeviceDetectorService } from 'ngx-device-detector';
import { WindowRefService } from 'app/services/window-ref.service';
import { DOCUMENT } from '@angular/common';

export enum screenSize {
  xs = 'xs',
  md = 'md',
  lg = 'lg'
}

@Injectable({
  providedIn: 'root'
})
export class MonthsCarouselService implements OnDestroy {
  private monthsSlider$: Subject<TNativeDivElement> = new Subject<TNativeDivElement>();
  private month$: Subject<TMonthProperty> = new Subject<TMonthProperty>();
  private activeMonth$: Subject<{ id: string }> = new Subject<{ id: string }>();

  private monthsSlider: TNativeDivElement;
  private queryMonthList = [];
  private activeBox: TNativeDivElement;
  private activeMonth = { id: '' };

  private monthList: Array<TSliderMonth> = [];
  private onDragSubscription: Subscription;
  private scrollSubscription: Subscription;
  private isSpinnerActive = false;
  private plugs = {
    jan: { id: 'Jan_plug', index: 0 },
    feb: { id: 'Feb_plug', index: 1 },
    nov: { id: 'Nov_plug', index: 10 },
    dec: { id: 'Dec_plug', index: 11 }
  };

  private screen: TScreenProperty = {
    currentScreenSize: null,
    scrollWidth: 0,
    startPoint: 0,
    scrollAmount: 600,
    screenWidth: 1500,
    currentPosition: 0,
    scrollStep: 300,
    wideScrollStep: 600,
    wideScreen: 1499,
    middleScreen: 1199,
    narrowScreen: 991
  };

  private desktop = null;

  private month: TMonthProperty = {
    activeMonth: null,
    currentFullDate: new Date(),
    amountOfYears: 10
  };

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private spinner: LoaderService,
    private windowRef: WindowRefService,
    private deviceService: DeviceDetectorService) {
    this.monthsSlider$.subscribe((carousel) => {
      this.monthsSlider = carousel;
    });

    this.spinner.subject.subscribe((data) => {
      this.isSpinnerActive = data.load;
    });

    this.getDeviceType();
  }

  getDeviceType() {
    this.desktop = this.deviceService.getDeviceInfo().deviceType === 'desktop';
  }

  getActiveMonth() {
    return this.activeMonth$.asObservable();
  }

  getMonth() {
    return this.month$.asObservable();
  }

  setCarousel(carousel: TNativeDivElement) {
    const reserveWidth = { short: 50, long: 150 };
    this.monthsSlider = carousel;
    this.monthsSlider$.next(this.monthsSlider);
    this.scrollSubscription = fromEvent(this.monthsSlider.nativeElement, 'scroll').subscribe(() => {
      const rectBox = this.activeBox.nativeElement.getBoundingClientRect();
      this.queryMonthList.forEach(el => {
        const id = el.nativeElement.firstChild.id;
        const rect = el.nativeElement.getBoundingClientRect();
        if (rect.left >= rectBox.left - reserveWidth.long && rect.left < rectBox.left + reserveWidth.long) {
          if (this.activeMonth !== id) {
            this.activeMonth.id = id;
            this.activeMonth$.next(this.activeMonth);
          }
        } else if (this.activeMonth === id && (rect.left >= rectBox.left + reserveWidth.short || rect.left < rectBox.left)) {
          this.activeMonth$.next({ id: 'disable' });
        }
      });
    });
  }

  setActiveBox(activeBox: TNativeDivElement) {
    this.activeBox = activeBox;
  }

  setQueryMonthsList(monthItems: QueryList<TNativeDivElement>) {
    this.queryMonthList = monthItems.toArray();
  }

  setScreenWidth(scrollWidth) {
    this.screen = { ...this.screen, scrollWidth };
  }

  onResize() {
    if (!this.windowRef.isPlatformBrowser) return;

    const {
      wideScreen,
      middleScreen,
      scrollStep,
      wideScrollStep,
      currentScreenSize,
      narrowScreen
    } = this.screen;

    const width = this.windowRef.nativeWindow.innerWidth;

    const setScreenProperties = ({ currentSize, screenWidth, startPoint, scrollAmount }) => {
      this.screen.currentScreenSize = currentSize;
      this.screen.screenWidth = screenWidth;
      this.screen.startPoint = startPoint;
      this.screen.scrollAmount = scrollAmount;
      this.getDeviceType();
      this.scrollToCurrentMonth();
    };

    if ((width >= wideScreen) && (currentScreenSize !== screenSize.lg)) {
      setScreenProperties({
        currentSize: screenSize.lg,
        screenWidth: wideScreen,
        startPoint: 0,
        scrollAmount: wideScrollStep
      });
    } else if (((width >= narrowScreen) && (width < wideScreen)) && (currentScreenSize !== screenSize.md)) {
      setScreenProperties({
        currentSize: screenSize.md,
        screenWidth: middleScreen,
        startPoint: scrollStep,
        scrollAmount: scrollStep
      });
    } else if ((width <= narrowScreen) && (currentScreenSize !== screenSize.xs)) {
      setScreenProperties({
        currentSize: screenSize.xs,
        screenWidth: narrowScreen,
        startPoint: wideScrollStep,
        scrollAmount: 0
      });
    }
  }

  checkPosition() {
    if (this.screen.currentPosition < this.screen.startPoint) {
      this.scrollToCurrentMonth(this.checkLastMonth(this.plugs.dec.id));
    } else if (this.screen.currentPosition > this.screen.scrollWidth - this.screen.screenWidth) {
      this.scrollToCurrentMonth(this.checkLastMonth(this.plugs.jan.id));
    }
  }

  dateCreator(index: number) {
    const middleDate = 15;
    const half = 2;
    const date = new Date();
    date.setDate(middleDate);
    date.setMonth(index);

    return `${date.getUTCMonth()}/${date.getUTCFullYear()}/${
      this.month.amountOfYears / half
    }`;
  }

  checkLastMonth(id) {
    switch (id) {
      case this.plugs.jan.id:
        id = this.dateCreator(this.plugs.jan.index);
        break;
      case this.plugs.dec.id:
        id = this.dateCreator(this.plugs.dec.index);
        break;
      case this.plugs.nov.id:
        id = this.dateCreator(this.plugs.nov.index);
        break;
      case this.plugs.feb.id:
        id = this.dateCreator(this.plugs.feb.index);
        break;
      default:
        break;
    }

    return id;
  }

  setDefaultData() {
    const { amountOfYears } = this.month;
    const storedDate = JSON.parse(this.windowRef.isPlatformBrowser ? sessionStorage.getItem('selectedMonth') : null);
    const newDate = (storedDate && new Date(storedDate)) || new Date();
    const half = 2;
    this.month.activeMonth = `${newDate.getUTCMonth()}/${newDate.getUTCFullYear()}/${
      amountOfYears / half
    }`;
    this.spinner.subject.subscribe((data) => {
      this.isSpinnerActive = data.load;
    });
    this.onResize();
  }

  createMonthList(monthLng: Array<string>) {
    this.monthList = [];
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
          ...newMonthList,
          monthCreator(
            date,
            name,
            `${date.getUTCMonth()}/${date.getUTCFullYear()}/${i}`
          )
        ];
      });
      this.monthList = [ ...this.monthList, ...newMonthList ];
      newMonthList = [];
    }
    const penultimateMonthCount = 2;

    this.monthList = [
      monthCreator(
        new Date(),
        monthLng[monthLng.length - penultimateMonthCount],
        this.plugs.nov.id
      ),
      monthCreator(
        new Date(),
        monthLng[monthLng.length - 1],
        this.plugs.dec.id
      ),
      ...this.monthList,
      monthCreator(new Date(), monthLng[0], this.plugs.jan.id),
      monthCreator(new Date(), monthLng[1], this.plugs.feb.id)
    ];
    this.setActiveMonth(this.month.activeMonth);

    return this.monthList;
  }

  calcMonthPosition(currentPosition: number, deltaY) {
    const { scrollStep } = this.screen;
    const direction = deltaY > 0 ? scrollStep : deltaY < 0 ? -scrollStep : 0;

    if (!!direction) {
      currentPosition = currentPosition + direction;
      const remainder = currentPosition % scrollStep;

      return remainder === 0
        ? currentPosition
        : currentPosition - remainder + scrollStep;
    }
  }

  scrollToCurrentMonth(id?) {
    if (id) {
      this.month.activeMonth = id;
    }
    this.queryMonthList.forEach((month) => {
      const { firstChild, offsetLeft } = month.nativeElement;
      if (this.month.activeMonth === firstChild.id) {
        this.screen.currentPosition = offsetLeft - this.screen.scrollAmount;
        this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
        this.setActiveMonth(firstChild.id);
        this.monthsSlider$.next(this.monthsSlider);
      }
    });
  }

  getMonthData(id: string) {
    this.month.activeMonth = id;
    this.monthList.forEach((month) => {
      if (month.id === id) {
        this.month.currentFullDate = month.date;
        this.windowRef.isPlatformBrowser && sessionStorage.setItem('selectedMonth', JSON.stringify(month.date));
        this.activeSpinner();
        this.month$.next(this.month);
      }
    });
  }

  activeSpinner() {
    if (!this.isSpinnerActive) {
      this.spinner.start('poster');
    }
  }

  onPrev() {
    if (!(this.monthsSlider.nativeElement.scrollLeft <= this.screen.startPoint)) {
      this.screen.currentPosition -= this.screen.scrollStep;
      this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
      this.setActiveMonth();
      this.activeSpinner();
      this.monthsSlider$.next(this.monthsSlider);
    } else {
      this.scrollToCurrentMonth(this.checkLastMonth(this.plugs.dec.id));
    }
  }

  onNext() {
    if (!(this.screen.scrollWidth - this.monthsSlider.nativeElement.scrollLeft <= this.screen.screenWidth)) {
      this.screen.currentPosition += this.screen.scrollStep;
      this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
      this.setActiveMonth();
      this.activeSpinner();
      this.monthsSlider$.next(this.monthsSlider);
    } else {
      this.scrollToCurrentMonth(this.checkLastMonth(this.plugs.jan.id));
    }
  }

  onDrag() {
    const { desktop } = this;
    const onStart$ = desktop ?
      fromEvent<any>(this.monthsSlider.nativeElement, 'mousedown')
      :
      fromEvent<any>(this.monthsSlider.nativeElement, 'touchstart');

    const mouEnd$ = desktop ?
      fromEvent<any>(this.doc, 'mouseup')
      :
      fromEvent<any>(this.doc, 'touchend');

    const scrollParams = {
      desktop: { speed: 2, count: 50 },
      device: { speed: 5, count: 10 }
    };

    let startPos = 0;
    const tagData = { name: '', id: '' };

    const onEnd = () => {
      return mouEnd$.pipe(map((event) => {
        return startPos - (desktop ? event.clientX : event.changedTouches[0].clientX);
      }));
    };

    this.onDragSubscription = onStart$
      .pipe(
        map((event) => {
          event.stopPropagation();
          tagData.name = event.target.localName;
          tagData.id = event.target.id;
          startPos = desktop ? event.clientX : event.changedTouches[0].clientX;
        }),
        switchMap(onEnd)
      )
      .subscribe((leftPosition) => {
        if (tagData.name !== 'span') {
          return;
        }
        // reserve value if user hand shuddered when he wanted to click
        const minCountForClick = desktop ? scrollParams.desktop.count : scrollParams.device.count;

        if (Math.abs(leftPosition) < minCountForClick) {
          this.queryMonthList.forEach((el) => {
            if (!!tagData.id) {
              tagData.id = this.checkLastMonth(tagData.id);
              if (tagData.id === this.month.activeMonth) {
                // this.stopSpinner()
                return;
              }
              if (el.nativeElement.firstChild.id === tagData.id) {
                this.screen.currentPosition =
                  el.nativeElement.offsetLeft - this.screen.scrollAmount;
                this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
                this.month.activeMonth = tagData.id;
                this.getMonthData(this.month.activeMonth);
                this.activeSpinner();
              }
            }
          });
        } else {
          // scrollSpeed for increasing scroll speed
          const scrollSpeed = desktop ? scrollParams.desktop.speed : scrollParams.device.speed;
          const { scrollStep } = this.screen;

          leftPosition *= scrollSpeed;
          const reminder = leftPosition % scrollStep;
          if (reminder !== 0) {
            leftPosition =
              (leftPosition > 0
                ? leftPosition + scrollStep
                : leftPosition - scrollStep) - reminder;
          }
          this.screen.currentPosition =
            this.screen.currentPosition + leftPosition;
          this.checkPosition();
          this.monthsSlider.nativeElement.scrollLeft = this.screen.currentPosition;
          this.setActiveMonth();
          this.activeSpinner();
        }
        this.monthsSlider$.next(this.monthsSlider);
        tagData.name = '';
        tagData.id = '';
      });
  }

  setActiveMonth(id?) {
    this.queryMonthList.forEach((el) => {
      if (id && el.nativeElement.firstChild.id === id) {
        this.getMonthData(id);
      } else if (
        el.nativeElement.offsetLeft ===
        this.screen.currentPosition + this.screen.scrollAmount
      ) {
        this.getMonthData(this.checkLastMonth(el.nativeElement.firstChild.id));
      }
    });
  }

  unSubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unSubscriber(this.scrollSubscription);
    this.unSubscriber(this.onDragSubscription);
  }
}
