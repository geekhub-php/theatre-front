import { Performance } from '../performance/Performance';

// TODO: Refactor performance event type
export class PerformanceEvent {
  id?: number;
  year?: number;
  month?: number;
  day?: number;
  date_time: string;
  time?: string;
  venue: string;
  ageLimit: number;
  buy_ticket_link: string;
  performance?: Performance;
  dateExist?: boolean;
  slug: string;
  src?: string;
  title?: string;
  type?: string;
}
