import { ImageCollection } from '../ImageCollection';
import { Performance } from '../Performance';
import { CalendarEvent } from 'angular-calendar';
import { Type } from 'class-transformer';

export class PerformanceEvent implements CalendarEvent {
  year: number;
  month: number;
  day: number;
  time: string;
  venue: string;

  @Type(() => Performance)
  performance: Performance;
  get start() {
    return new Date(`${this.year}-${this.month}-${this.day} ${this.time}`);
  }

  get title() {
    return this.performance.title;
  }
}
