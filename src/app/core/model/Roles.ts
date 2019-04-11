import { Performance } from './Performance';
import { Employee } from './Employee';
import { EmployeesListResponse } from './EmoloyeeListResponse';
import { ImageCollection } from './ImageCollection';

export class Roles implements Performance {
  mainPicture: ImageCollection;
  sliderImage: ImageCollection;
  title: string;
  description: string;
  performance: Performance;
  employee: Employee;
  slug: string;
  created_at: Date;
  update_at: Date;
  deleted_at: Date;
}
