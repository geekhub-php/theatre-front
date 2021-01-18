import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LangService } from '../../services/lang.service';
import { filter } from 'rxjs/operators';
import { VisuallyImpairedService } from '../../services/visually-impaired/visually-impaired.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapse = false;
  trigger = this.visuallyImpairedService.triggerVisuallyImpaired;
  isCollapsed = false;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(
    private router: Router,
    private langService: LangService,
    private visuallyImpairedService: VisuallyImpairedService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);
  }

  toogleMenu() {
    this.collapse = !this.collapse;
  }

  collapseMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
