import { Component, OnInit } from '@angular/core';
import { EmployeeGroup } from '../../../store/employee/EmployeeGroup';
import { GatewayService } from '../../../services/gateway.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persons-header',
  templateUrl: './persons-header.component.html',
  styleUrls: ['./persons-header.component.scss']
})
export class PersonsHeaderComponent implements OnInit {
  rootGroups: Array<EmployeeGroup>;

  constructor(private gateway: GatewayService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gateway.getEmployeesGroups().subscribe((Groups) => {
      this.rootGroups = Groups;
      // this.rootGroups = Groups.sort((a: EmployeeGroup, b: EmployeeGroup) => {
      //   if (a.position > b.position) {
      //     return 1;
      //   }
      //
      //   return -1;
      // });

      if (this.rootGroups.length === 0) {
        return;
      }

      if (this.router.url === '/team') {
        this.router.navigateByUrl('/team/' + this.rootGroups[0].slug);
      }
    });
  }

}
