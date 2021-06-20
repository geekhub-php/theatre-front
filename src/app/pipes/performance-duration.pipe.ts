import { Pipe, PipeTransform } from '@angular/core';

interface IPerformanceDuration {
  min: number;
  h: number;
}

@Pipe({
  name: 'performanceDuration'
})
export class PerformanceDurationPipe implements PipeTransform {
  time: IPerformanceDuration = {
    min: 0,
    h: 0
  };

  transform(value: number, language: 'uk' | 'en'): string {
    this.setTime(value);
    const { min, h } = this.time;

    return language === 'en' ? `${h} h. ${min} min.` : `${h} год. ${min} хв.`;
  }

  setTime(minutes: number) {
    const hour = 60;
    this.time.min = minutes % hour;
    this.time.h = (minutes - this.time.min) / hour;
  }
}
