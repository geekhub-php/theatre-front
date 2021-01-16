import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';
import { Employee } from '../core/model/employee/Employee';
import { LoaderService } from '../shared/spinner/loader.service';
import { EmployeesListResponse } from '../core/model/employee/EmployeesListResponse';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  employees: Array<Employee> = [];
  artCoreEmployees: Array<Employee>;
  artProductionEmployees: Array<Employee>;
  administrativeEmployees: Array<Employee>;
  creativeEmployees: Array<Employee>;
  invitedActorEmployees: Array<Employee>;
  employeesStatus;

  constructor(
    private httpGatewayService: GatewayService,
    private loaderService: LoaderService,
    private meta: Meta
  ) {
    this.meta.updateTag({ property: 'og:title', content: 'Черкаський драматичний театр імені Т. Г. Шевченка' });
    this.meta.updateTag(
      {property: 'og:description', content: 'Персоналії Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка'});
    this.meta.updateTag(
      {property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/uk/assets/images/persons.jpg'});
  }

  ngOnInit() {
    this.getEmployees();
    this.httpGatewayService.updateCanonicalURL();
  }

  getEmployees() {
    this.loaderService.start('load-team');
    this.httpGatewayService.getEmployees().subscribe((persons) => {
      this.employees = this.employees.concat(persons);
      this.artCoreEmployees = this.getEmployeesStatus('art-core');
      this.artProductionEmployees = this.getEmployeesStatus('art-production');
      this.administrativeEmployees = this.getEmployeesStatus('administrative');
      this.creativeEmployees = this.getEmployeesStatus('creative');
      this.invitedActorEmployees = this.getEmployeesStatus('invited');
      this.employeesStatus = [this.artCoreEmployees, this.artProductionEmployees, this.administrativeEmployees,
        this.creativeEmployees, this.invitedActorEmployees];
      this.loaderService.stop('load-team');
    });
  }

  getEmployeesStatus(status) {
    return this.employees.filter((person) => person.staff === status);
  }
}
