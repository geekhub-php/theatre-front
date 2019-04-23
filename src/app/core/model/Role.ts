import { Performance } from './Performance';
import { Employee } from './employee/Employee';
import { EmployeesListResponse } from './employee/EmployeesListResponse';
import { ImageCollection } from './ImageCollection';

export class Role {
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
