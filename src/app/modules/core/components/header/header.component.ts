import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { LangService } from '../../../../services/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  collapse = false;
  isCollapsed = false;
  search_text = 'Enter your search key word/words';
  textValue = '';

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(
    private router: Router,
    private langService: LangService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);
  }

  toggleMenu(): void {
    this.collapse = !this.collapse;
  }

  collapseMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  sendRequestOnIconClick(): void {
    /*console.log(this.textValue);*/
    this.textValue = '';
  }

  sendRequestOnEnter() {
/*    console.log(this.textValue);*/
    this.textValue = '';
  }

  clearSubmit(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
