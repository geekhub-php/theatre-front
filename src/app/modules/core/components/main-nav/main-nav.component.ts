import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent {
  route: string;

  constructor(private location: Location, private router: Router) {
    router.events.subscribe(() => {
      this.route = location.path();
    });
  }
}
