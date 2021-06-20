import { Component, OnInit } from '@angular/core';
import { LangService } from '../../../../services/lang.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(private langService: LangService) {
  }


  ngOnInit() {
  }

}
