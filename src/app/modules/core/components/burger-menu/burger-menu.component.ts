import { Component, Inject, LOCALE_ID } from '@angular/core';
import { sideBarAnimation } from 'app/utilities/side-bar-animation';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';
import { LangService } from 'app/services/lang.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: [ './burger-menu.component.scss' ],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})

export class BurgerMenuComponent {
  isNavbarActive = false;
  isEn = false;

  constructor(
    private sidebarService: SidebarService,
    private langService: LangService,
    @Inject(LOCALE_ID) private localeId: string) {
    this.sidebarService.subject.subscribe(({ isActive, barName })  => {
      this.isNavbarActive = isActive && barName === ESidebar.navbar;
    });
    const idLength = 2;
    this.isEn = this.localeId.slice(0, idLength) === 'en';
  }

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  closeBurgerMenu() {
    this.sidebarService.close(ESidebar.navbar);
  }
}
