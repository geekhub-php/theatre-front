import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';
import { Employee } from '../core/model/employee/Employee';
import { LoaderService } from '../shared/spinner/loader.service';

enum EmployeeStatuses {
  CORE = 'art-core',
  DIRECTOR = 'art-director',
  PRODUCTION = 'art-production',
  ADMIN = 'administrative',
  CREATIVE = 'creative',
  GUESTS = 'invited'
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  employees: Array<Employee> = [];
  tagsList = [ EmployeeStatuses.DIRECTOR, EmployeeStatuses.ADMIN, EmployeeStatuses.CORE, EmployeeStatuses.CREATIVE,
    EmployeeStatuses.PRODUCTION, EmployeeStatuses.GUESTS];
  selectedTag: EmployeeStatuses;
  filteredEmployees: Array<Employee> = [];
  statuses = EmployeeStatuses;

  constructor(
    private httpGatewayService: GatewayService,
    private loaderService: LoaderService,
  ) {
    this.httpGatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Персоналії Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/uk/assets/images/persons.jpg');
  }

  ngOnInit() {
    this.getEmployees();
    this.httpGatewayService.updateCanonicalURL();
  }

  getEmployees() {
    this.loaderService.start('load-team');

    this.httpGatewayService.getEmployees().subscribe((persons) => {
      this.employees = this.employees.concat(persons);
      this.switchTag(this.tagsList[0]);

      this.loaderService.stop('load-team');
    });
  }

  switchTag(tag) {
    if (this.selectedTag === tag) return;

    this.selectedTag = tag;

    if (!tag) {
      this.filteredEmployees = this.employees;

      return;
    }

    this.filteredEmployees = this.filterEmployeesByStatus(tag);
  }

  filterEmployeesByStatus(status) {
    return this.employees.filter((person) => person.staff === status);
  }
}
