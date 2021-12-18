import { Component, OnInit } from '@angular/core';

import { LangService, Locales } from 'app/services/lang.service';
import { sideBarAnimation } from 'app/utilities/side-bar-animation';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';
import { EmployeeGroup } from 'app/store/employee/EmployeeGroup';
import { GatewayService } from 'app/services/gateway.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: [ './burger-menu.component.scss' ],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})

export class BurgerMenuComponent implements OnInit {
  isNavbarActive = false;
  localeId: Locales = Locales.en;
  personalitiesGroups: Array<EmployeeGroup> = [];

  constructor(
    private gateway: GatewayService,
    private langService: LangService,
    private sidebarService: SidebarService,
  ) {
    this.sidebarService.subject.subscribe(({ isActive, barName })  => {
      this.isNavbarActive = isActive && barName === ESidebar.navbar;
    });

    this.langService.localeId$.subscribe(localeId => {
      this.localeId = localeId;
    });
  }

  ngOnInit() {
    this.gateway.getEmployeesGroups().subscribe((Groups) => {
      this.personalitiesGroups = Groups;

      if (this.personalitiesGroups.length === 0) {
        return;
      }
    });
  }

  get ukLangUrl() {
    return this.langService.getLangRedirectUrl(Locales.uk);
  }

  get enLangUrl() {
    return this.langService.getLangRedirectUrl(Locales.en);
  }

  closeBurgerMenu() {
    this.sidebarService.close(ESidebar.navbar);
  }
}
