import { ListResponseInterface } from './ListResponseInterface';
import { Performance } from './Performance';

export class PerformanceListResponse implements ListResponseInterface {
  total_count: number;
  count: number;
  performances: Array<Performance>;
  page: number;
}
