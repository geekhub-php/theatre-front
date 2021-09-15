import { Performance } from '../performance/Performance';

export class PerformanceEvent {
  id: number;
  year: number;
  month: number;
  day: number;
  date_time: string;
  time: string;
  venue: string;
  buy_ticket_link: string;
  performance: Performance;
  dateExist: boolean;
}
