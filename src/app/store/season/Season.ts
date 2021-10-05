import { EAudience } from '../Audience';

export class Season {
  id: number;
  name: string;
  number: number;
  audience: EAudience;
  start_date: string;
  end_date: string;
  performance_count: number;
}
