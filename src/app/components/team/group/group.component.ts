import { Component, OnInit } from '@angular/core';

import { Employee } from 'app/store/employee/Employee';
import { GatewayService } from 'app/services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeGroup } from '../../../store/employee/EmployeeGroup';
import { EmployeesListResponse } from '../../../store/employee/EmployeesListResponse';
import { sortHelper } from 'app/utilities/sortHelper';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: [ './group.component.scss' ]
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
  isLoading = false;

  constructor(
    private gateway: GatewayService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.loaderService.start('team');
    this.httpGatewayService.getEmployeesGroups().subscribe((groups) => {
      groups.forEach((group: EmployeeGroup) => {
        if (groupSlug !== group.slug) {
          return;
        }

        this.isLoading = true;

        this.group = group;
        this.childGroups = [];

        if (group.children?.length > 0) {
          group.children.sort(sortHelper({ sortKey: 'position' }));

          group.children.forEach((chG: EmployeeGroup) => {
            this.httpGatewayService.getEmployeesListByGroup(chG.slug).subscribe((resp: EmployeesListResponse) => {
              this.childGroups.push({ group: chG, employees: resp.employees });
              this.isLoading = false;
              this.loaderService.stop('team');
            });
          });
        } else {
          this.httpGatewayService.getEmployeesListByGroup(group.slug).subscribe((resp: EmployeesListResponse) => {
            if (resp.employees?.length === 1) {
              return this.router.navigate([ 'team', group.slug, 'person', resp.employees[0].slug ]).then(() => {
                this.isLoading = false;
                this.loaderService.stop('team');
              });
            }
            this.childGroups.push({ group, employees: resp.employees });
            this.isLoading = false;
            this.loaderService.stop('team');
          });
        }

      });
    });
  }
}
