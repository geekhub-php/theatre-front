import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../partials/spinner/loader.service';
import { GatewayService } from '../../../services/gateway.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artistic',
  templateUrl: './artistic.component.html',
  styleUrls: ['./artistic.component.scss'],
})
export class ArtisticComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.start('artistic');
    this.gateway.updateCanonicalURL();
  }
}
