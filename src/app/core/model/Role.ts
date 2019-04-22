import { Performance } from './performance/Performance';
import { Employee } from './employee/Employee';
import { PerformanceImageCollection } from './performance/PerformanceImageCollection';

export class Role {
  mainPicture: PerformanceImageCollection;
  sliderImage: PerformanceImageCollection;
  title: string;
  description: string;
  performance: Performance;
  employee: Employee;
  slug: string;
  created_at: Date;
  update_at: Date;
  deleted_at: Date;
}
