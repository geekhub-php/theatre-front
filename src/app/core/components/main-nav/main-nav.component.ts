import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { VisuallyImpairedService } from '../../services/visually-impaired/visually-impaired.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  trigger = this.visuallyImpairedService.triggerVisuallyImpaired;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(
    private langService: LangService,
    private visuallyImpairedService: VisuallyImpairedService
  ) { }
}
