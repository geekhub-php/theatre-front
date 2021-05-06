import { Component } from '@angular/core';
import { LangService } from '../../../../services/lang.service';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  private breakInService: BreadcrumbService;
  private router: Router;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(private langService: LangService) {
  }

  breakIn(breakInTarget: string): void {
    this.breakInService.breakIn(breakInTarget);
    this.router.navigate(['/']);
  }

  resetbreakIn(): void {
    this.breakInService.resetBreakIns();
    this.router.navigate(['/']);
  }
}
