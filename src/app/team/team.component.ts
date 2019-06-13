import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';
import { Employee } from '../core/model/employee/Employee';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  employees: Array<Employee> = [];
  limit: string;
  page: number;
  collectionSize: number;

  constructor(
    private httpGatewayService: GatewayService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getEmployees(this.limit, this.page);
  }

  getEmployees(limit, page) {
    this.loaderService.start('load-team');
    this.httpGatewayService.getEmployees(limit, page).subscribe((res) => {
      this.employees = this.employees.concat(res.employees);
      this.collectionSize = res.total_count;
      this.page = res.page;
    });
  }

  onScroll() {
    if (this.employees.length < this.collectionSize) this.getEmployees(this.limit, this.page + 1);
    if (this.employees.length === this.collectionSize) this.loaderService.stop('load-team');
  }
}
