import { screenSize } from '../../components/schedule/months-carousel/months-carousel.service';

export type TSliderMonth = {
  id: string,
  name: string
  date: Date
}

export type TScreenProperty = {
  scrollWidth: number,
  startPoint: number,
  scrollAmount: number,
  screenWidth: number, //can change
  currentPosition: number,
  currentScreenSize: screenSize | null,
  scrollStep: number,
  wideScrollStep: number,
  // default screen sizes
  wideScreen: number,
  middleScreen: number,
  narrowScreen: number
}

export type TMonthProperty = {
  activeMonth: null | string,
  currentFullDate: Date,
  // amountOfYears must even number and more than 2
  amountOfYears: 10
}

export type TNativeDivElement = {
  nativeElement: HTMLDivElement
}
