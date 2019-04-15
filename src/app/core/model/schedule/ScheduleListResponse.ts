import { AbstractListResponse } from '../AbstractListResponse';
import { PerformanceEvent } from './PerformanceEvent';
 //import { Type } from 'class-transformer';

export class ScheduleListResponse extends  AbstractListResponse {
   //@Type(() => PerformanceEvent)
  performance_events: Array<PerformanceEvent>;
}
