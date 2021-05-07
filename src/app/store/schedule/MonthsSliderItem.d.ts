export type TSliderMonth = {
  id: string,
  name: string
  date: Date
}

export type TScreenProperty = {
  fullScreen: boolean,
  scrollWidth: number,
  startPoint: number,
  scrollAmount: number,
  screenWidth: number, //can change
  currentPosition: number,
  scrollStep: number,
  wideScrollStep: number,
  // default screen sizes
  wideScreen: number,
  narrowScreen: number
}

export type TMonthProperty = {
  activeMonth: null | string,
  currentFullDate: Date,
  // amountOfYears must even number and more than 2
  amountOfYears: 150
}

export type TMonthsSliderElement = {
  nativeElement: HTMLDivElement
}
