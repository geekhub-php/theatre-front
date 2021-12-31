import { Component, OnInit } from '@angular/core';
import { EmployeeGroup } from '../../../store/employee/EmployeeGroup';
import { GatewayService } from '../../../services/gateway.service';
import { Router, ActivatedRoute } from '@angular/router';
import { sortHelper } from '../../../utilities/sortHelper';

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
    this.gateway.getEmployeesGroups().subscribe((groups) => {
      if (this.rootGroups?.length === 0) {
        return;
      }

      this.rootGroups = groups.sort(sortHelper({ sortKey: 'position' }));

      if (this.router.url === '/team') {
        this.router.navigateByUrl('/team/' + this.rootGroups[0].slug);
      }
    });
  }

}
