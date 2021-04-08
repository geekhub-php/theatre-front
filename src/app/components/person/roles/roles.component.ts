import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../partials/spinner/loader.service';
import { Role } from '../../../store/Role';
import { GatewayService } from '../../../services/gateway.service';

@Component({
  selector: 'app-person-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
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
