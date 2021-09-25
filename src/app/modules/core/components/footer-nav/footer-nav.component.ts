import { Component, OnInit } from '@angular/core';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void { }

  activeDonateMenu() {
    this.sidebarService.open(ESidebar.donate);
  }
}
