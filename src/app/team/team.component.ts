import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { Employee } from './employee';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  employee: Employee;
  employees: Array<Employee>;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getEmployees().subscribe((res: HttpResponse<Array<Employee>>) => {
      console.log(res.body);
      this.employees = res.body.employees;
    });
  }

}
