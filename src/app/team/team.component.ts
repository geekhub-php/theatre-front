import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Employee } from '../core/model/Employee';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  employee: Employee;
  employees: Array<Employee>;

  constructor(private httpGatewayService: GatewayService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.httpGatewayService.getEmployees().subscribe((res) => {
      this.employees = res.body.employees;
    });
  }
}
