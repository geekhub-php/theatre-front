import { Component, OnInit } from '@angular/core';
import { GatewayService } from "../../../services/gateway.service";
import { Employee } from "../../../store/employee/Employee";
import { EmployeesListResponse } from "../../../store/employee/EmployeesListResponse";
import { LoaderService } from "../../partials/spinner/loader.service";

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {
  listEmployees: Array<Employee>;;

  constructor(
    private getway: GatewayService,
    private loaderService: LoaderService
  ) {
    this.getway.updateMeta(
      "Черкаський драматичний театр імені Т. Г. Шевченка",
      "Історія Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка",
      "http://theatre-shevchenko.ck.ua/assets/images/logo.png"
    );
  }

  ngOnInit() {
    this.loaderService.start("about");
    this.getway.getEmployeesList().subscribe(
      (res: EmployeesListResponse) => {
        this.listEmployees = res.employees;

        // console.log(this.listEmployees[0]); // del
        
        this.loaderService.stop("about");
      },
      (err) => this.loaderService.stop("about") // TODO: error handler
    );
    this.loaderService.start("about");
    this.getway.updateCanonicalURL();
  }

}
