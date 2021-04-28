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
  screenWidth: number,
  currentPosition: number,
  scrollStep: number,
  wideScrollStep: number
}

export type TMonthProperty = {
  activeMonth: null | string,
  currentDate: string,
}

