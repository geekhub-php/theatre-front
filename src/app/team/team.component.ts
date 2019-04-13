import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Employee } from '../core/model/Employee';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  employees: Array<Employee> = [];
  page: number;
  collectionSize: number;

  @Output() name: EventEmitter<string> = new EventEmitter();
  @Output() hide: EventEmitter<string> = new EventEmitter();


  constructor(private httpGatewayService: GatewayService) {}

  ngOnInit() {
    this.getEmployees(this.page);
  }

  getEmployees(page) {
    this.name.emit('load-team');
    this.httpGatewayService.getEmployees(page).subscribe((res) => {
      this.employees = this.employees.concat(res.body.employees);
      this.collectionSize = res.body.total_count;
      this.page = res.body.page;
    });
  }

  onScroll() {
    if (this.employees.length < this.collectionSize) this.getEmployees(this.page + 1);
  }
}
