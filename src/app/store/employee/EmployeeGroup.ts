export class EmployeeGroup {
  title: string;
  slug: string;
  position: number;
  children: Array<EmployeeGroup>;
}
