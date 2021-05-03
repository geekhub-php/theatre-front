import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../partials/spinner/loader.service';
import { GatewayService } from '../../../services/gateway.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss'],
})
export class CreativeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.start('creative');
    this.gateway.updateCanonicalURL();
  }
}
