import { Component, OnInit } from '@angular/core';
import { DonateService } from 'app/components/donate/donate.service';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss']
})
export class FooterNavComponent implements OnInit {

  constructor(private donateService: DonateService) { }

  ngOnInit(): void { }

  activeDonateMenu() {
    this.donateService.activeDonateMenu();
  }

}
