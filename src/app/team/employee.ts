export class Employee {
  avatar: any;
  biography: string;
  created_at: string;
  dob: string;
  first_name: string;
  gallery: any;
  last_name: string;
  locale: string;
  position: string;
  slug: string;
  updated_at: string;
}

abstract class ListResponse {
  total_count: number;
  page: number;
  count: number;
}
export class EmployeeListResponse extends ListResponse {
  employees: Array<Employee>;
}
