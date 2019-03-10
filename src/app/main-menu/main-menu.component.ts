import { Component, OnInit } from '@angular/core';
import { NavModel } from './nav.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  navs: Array<NavModel>;

  constructor() { }

  ngOnInit() {
    this.navs = [
      {title: 'Home', url: ''},
      {title: 'Poster', url: '/poster'},
      {title: 'Repertoire', url: '/repertoire'},
      {title: 'News', url: '/news'},
      {title: 'About Us', url: '/about'},
      {title: 'Persons', url: '/persons'},
      {title: 'Contacts', url: '/contacts'},
    ];
  }

}
