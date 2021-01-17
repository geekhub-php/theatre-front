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
  artDirector: Array<Employee>;
  artCoreEmployees: Array<Employee>;
  artProductionEmployees: Array<Employee>;
  administrativeEmployees: Array<Employee>;
  creativeEmployees: Array<Employee> = [];
  invitedActorEmployees: Array<Employee>;
  activeIds: Array<string> = [];

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
      this.artDirector = this.getEmployeesStatus('art-director');
      this.artCoreEmployees = this.getEmployeesStatus('art-core');
      this.artProductionEmployees = this.getEmployeesStatus('art-production');
      this.administrativeEmployees = this.getEmployeesStatus('administrative');
      this.creativeEmployees = this.getEmployeesStatus('creative');
      this.invitedActorEmployees = this.getEmployeesStatus('invited');
      this.loaderService.stop('load-team');
    });
  }

  getEmployeesStatus(status) {
    return this.employees.filter((person) => person.staff === status);
  }

  openAll() {
    this.activeIds.length !== 0 ? this.activeIds = [] : this.activeIds = ['artDirector',
      'artCoreEmployees', 'artProductionEmployees', 'administrativeEmployees', 'creativeEmployees', 'invitedActorEmployees'];
  }
}
