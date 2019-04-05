import { Performance } from './Performance';
import { AbstractListResponse } from './AbstractListResponse';

export class PerformanceListResponse extends AbstractListResponse {
  performances: Array<Performance>;
}
