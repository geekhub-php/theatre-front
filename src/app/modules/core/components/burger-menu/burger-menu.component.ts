import { Component } from '@angular/core';
import { sideBarAnimation } from 'app/utilities/side-bar-animation';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: [ './burger-menu.component.scss' ],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})

export class BurgerMenuComponent {
  isNavbarActive = false;
  showSubMenuPersons = false;
  showSubMenuAbout = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.subject.subscribe(({ isActive, barName })  => {
      this.isNavbarActive = isActive && barName === ESidebar.navbar;
    });
  }

  closeBurgerMenu() {
    this.sidebarService.close(ESidebar.navbar);
  }
}
