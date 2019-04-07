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
  page: number;
  collectionSize: number;
  secondPage: Array<Employee>;
  thirdPage: Array<Employee>;

  constructor(private httpGatewayService: GatewayService) {
  }

  ngOnInit() {
    this.getEmployees(this.page);
  }

  getEmployees(page) {
    this.httpGatewayService.getEmployees(page).subscribe((res) => {
      this.employees = res.body.employees;
      this.collectionSize = res.body.total_count;
      this.page = res.body.page;
    });
  }

  getSecondPage() {
    const page = 2;
    this.httpGatewayService.getEmployees(page).subscribe((res) => {
      this.secondPage = res.body.employees;
    });
  }

  getThirdPage() {
    const page = 3;
    this.httpGatewayService.getEmployees(page).subscribe((res) => {
      this.thirdPage = res.body.employees;
    });
  }
}
