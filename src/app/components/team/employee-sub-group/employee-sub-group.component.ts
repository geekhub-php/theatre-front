import { Component, Input, OnInit } from '@angular/core';
import { EmployeeGroup } from '../../../store/employee/EmployeeGroup';
import { GatewayService } from '../../../services/gateway.service';
import { Employee } from '../../../store/employee/Employee';

@Component({
  selector: 'app-employee-sub-group',
  templateUrl: './employee-sub-group.component.html',
  styleUrls: ['./employee-sub-group.component.scss']
})
export class EmployeeSubGroupComponent implements OnInit {
  @Input() group: EmployeeGroup;
  employees: Array<Employee> = [];
  constructor(private httpGatewayService: GatewayService) { }

  ngOnInit(): void {
    this.httpGatewayService.getEmployeesListByGroup(this.group.slug).subscribe((persons) => {
      this.employees = this.employees.concat(persons.employees);
    });
  }
}
