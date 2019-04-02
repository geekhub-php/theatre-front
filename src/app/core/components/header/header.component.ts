import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  showMenu() {
    document.getElementById('mobileMenu').classList.toggle('collapse');
/*  убрать  в main-nav класс hide*/
    document.getElementById('mobile1').classList.toggle('hide');
    document.getElementById('mobile2').classList.toggle('hide');
    document.getElementById('mobile3').classList.toggle('hide');
  }

}
