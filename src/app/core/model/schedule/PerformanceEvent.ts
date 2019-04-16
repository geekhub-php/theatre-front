import { ImageCollection } from '../ImageCollection';
import { Performance } from '../Performance';


export class PerformanceEvent {
  year: number;
  month: number;
  day: number;
  time: string;
  venue: string;

  performance: Performance;
  /*get start() {
    return new Date(`${this.year}-${this.month}-${this.day} ${this.time}`);
  }

  get title() {
    return this.performance.title;
  }*/
}
