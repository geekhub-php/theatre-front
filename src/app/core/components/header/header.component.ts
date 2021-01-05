import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LangService } from '../../services/lang.service';
import { filter } from 'rxjs/operators';
import { triggerVisuallyImpaired } from '../visually-impaired/visually-impaired.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapse = false;
  trigger = triggerVisuallyImpaired;

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

  toogleMenu() {
    this.collapse = !this.collapse;
  }
}
