import { ImageCollection } from '../ImageCollection';
import { Performance } from '../Performance';
import { CalendarEvent } from 'angular-calendar';

export class PerformanceEvent implements CalendarEvent {
  year: number;
  month: number;
  day: number;
  time: string;
  venue: string;
  performance: Performance;
  get start() {
    return new Date(`${this.year}-${this.month}-${this.day} ${this.time}`);
  }
  get end() {
    const start = this.start;
  }
}
