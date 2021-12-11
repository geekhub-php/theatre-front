import { Component, OnInit } from '@angular/core';

import { Employee } from 'app/store/employee/Employee';
import { GatewayService } from 'app/services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeGroup } from '../../../store/employee/EmployeeGroup';
import { EmployeesListResponse } from '../../../store/employee/EmployeesListResponse';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})

export class GroupComponent implements OnInit {
  directorEmployees: Array<Employee> = [];
  deputiesEmployees: Array<Employee> = [];
  adminAccountingEmployees: Array<Employee> = [];
  group: EmployeeGroup;
  childGroups: Array<{
    group: EmployeeGroup,
    employees: Array<Employee>,
  }> = [];

  constructor(
    private gateway: GatewayService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private httpGatewayService: GatewayService
  ) {
    this.gateway.updateMeta(
      'Черкаський драматичний театр імені Т. Г. Шевченка',
      'Персоналії Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png'
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.initGroup(value.group);
    });

    this.gateway.updateCanonicalURL();
  }

  private initGroup(groupSlug) {
    this.httpGatewayService.getEmployeesGroups().subscribe((Groups) => {
      Groups.forEach((g: EmployeeGroup) => {
        if (groupSlug !== g.slug) {
          return;
        }
        this.group = g;
        this.childGroups = [];

        if (g.children.length > 0) {
          g.children.forEach((chG: EmployeeGroup) => {
            this.httpGatewayService.getEmployeesListByGroup(chG.slug).subscribe((resp: EmployeesListResponse) => {
              this.childGroups.push({group: chG, employees: resp.employees});
            });
          });
        } else {
          this.httpGatewayService.getEmployeesListByGroup(g.slug).subscribe((resp: EmployeesListResponse) => {
            this.childGroups.push({group: g, employees: resp.employees});
          });
        }

      });
      this.loaderService.stop('personalities');
    });
  }
}
