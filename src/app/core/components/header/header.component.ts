import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapse = true;

  constructor() {
  }

  ngOnInit() {
  }

  showMenu() {
    this.collapse = !this.collapse;
  }

  hideMenu() {
    this.collapse = !this.collapse;
  }
}
