import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-persone-showmore',
  templateUrl: './persone-showmore.component.html',
  styleUrls: ['./persone-showmore.component.scss']
})
export class PersoneShowmoreComponent implements OnInit {

  constructor(
    private getway: GatewayService,
    private loaderService: LoaderService
  ) {  }

  ngOnInit() {

    this.loaderService.start('persons');
    this.getway.updateCanonicalURL();
  }
}
