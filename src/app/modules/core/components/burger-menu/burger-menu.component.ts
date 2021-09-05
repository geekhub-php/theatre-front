import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {
  @Output() outputFromChild: EventEmitter<boolean> = new EventEmitter();
  burgerMenuIsOpened = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  closeBurgerMenu() {
    this.outputFromChild.emit(this.burgerMenuIsOpened);
  }
}
