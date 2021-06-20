import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../partials/spinner/loader.service';
import { GatewayService } from '../../../services/gateway.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-epoch',
  templateUrl: './epoch.component.html',
  styleUrls: ['./epoch.component.scss'],
})
export class EpochComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.start('about-epoch');
    this.gateway.updateCanonicalURL();
  }
}
