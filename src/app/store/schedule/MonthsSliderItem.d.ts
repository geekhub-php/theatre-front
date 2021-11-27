import { screenSize } from '../../components/schedule/months-carousel/months-carousel.service';

export interface TSliderMonth {
  id: string;
  name: string;
  date: Date;
}

export interface TScreenProperty {
  scrollWidth: number;
  startPoint: number;
  scrollAmount: number;
  screenWidth: number; // can change
  currentPosition: number;
  currentScreenSize: screenSize | null;
  scrollStep: number;
  wideScrollStep: number;
  // default screen sizes
  wideScreen: number;
  middleScreen: number;
  narrowScreen: number;
}

export interface TMonthProperty {
  activeMonth: null | string;
  currentFullDate: Date;
  // amountOfYears must even number and more than 2
  amountOfYears: 10;
}

export interface TInteractiveCat {
  currentSize: string | null;
  moveStep: number | null;
  md: 999;
  xs: 499;
  wideStep: 25;
  mediumStep: 15;
  shortStep: 10;
}

export interface TNativeDivElement {
  nativeElement: HTMLDivElement;
}
