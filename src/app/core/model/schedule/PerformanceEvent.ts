import { ImageCollection } from '../ImageCollection';
import { Performance } from '../Performance';


export class PerformanceEvent {
  year: number;
  month: number;
  day: number;
  time: string;
  venue: string;

  performance: Performance;
}
