import { ListResponseInterface } from './ListResponseInterface';
import { Performance } from './Performance';

export class PerformanceListResponse implements ListResponseInterface {
  performances: Array<Performance>;
  page: number;
}
