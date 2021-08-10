import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-about-more',
  templateUrl: './about-more.component.html',
  styleUrls: ['./about-more.component.scss']
})
export class AboutMoreComponent implements OnInit  {

  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.start('about-more');
    this.gateway.updateCanonicalURL();
  }
}
