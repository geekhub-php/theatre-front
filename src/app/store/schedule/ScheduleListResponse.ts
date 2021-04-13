import { AbstractListResponse } from '../AbstractListResponse';
import { PerformanceEvent } from './PerformanceEvent';

export class ScheduleListResponse extends  AbstractListResponse {
  performance_events: Array<PerformanceEvent>;
}
