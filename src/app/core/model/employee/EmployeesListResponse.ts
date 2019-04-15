import { ListResponseInterface } from '../ListResponseInterface';
import { Employee } from './Employee';

export class EmployeesListResponse implements ListResponseInterface {
  total_count: number;
  page: number;
  count: number;
  employees: Array<Employee>;
}
