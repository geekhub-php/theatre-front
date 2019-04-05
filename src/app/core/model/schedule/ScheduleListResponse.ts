import { AbstractListResponse } from '../AbstractListResponse';
import { Schedule } from './Schedule';

export class ScheduleListResponse extends  AbstractListResponse{
  schedule: Array<Schedule>;
}
