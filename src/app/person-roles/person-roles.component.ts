import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';
import { Role } from '../core/model/Role';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-person-roles',
  templateUrl: './person-roles.component.html',
  styleUrls: ['./person-roles.component.scss']
})
export class PersonRolesComponent implements OnInit {
  roles: Array<Role>;
  @Input() actorSlug: string;

  constructor(
    private loaderService: LoaderService,
    private gatewayService: GatewayService) { }

  ngOnInit() {
    this.loaderService.start('person-roles');
    this.getRoles();
  }

  getRoles() {
    this.gatewayService.getActorRoles(this.actorSlug).subscribe((res) => {
      this.roles = res;
      this.loaderService.stop('person-roles');
    });
  }
}
