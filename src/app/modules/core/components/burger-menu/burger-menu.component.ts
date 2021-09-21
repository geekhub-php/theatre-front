import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TSideBar } from '../header/header.component';
import { sideBarAnimation } from 'app/utilities/side-bar-animation';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: [ './burger-menu.component.scss' ],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})

export class BurgerMenuComponent implements OnInit {
  @Input() sideBarVisibility$: BehaviorSubject<TSideBar>;
  sideBarState: TSideBar = 'out';
  showSubMenuPersons = false;
  showSubMenuAbout = false;

  constructor() {
  }

  ngOnInit(): void {
    this.sideBarVisibility$?.subscribe(newState => {
      this.sideBarState = newState;
    });
  }

  closeBurgerMenu() {
    this.sideBarVisibility$.next('out');
    // this.burgerMenuIsOpened = this.burgerMenuIsOpened === 'out' ? 'in' : 'out';
  }
}
