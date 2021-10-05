import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repertoire-nav-header',
  templateUrl: './repertoire-nav-header.component.html',
  styleUrls: ['./repertoire-nav-header.component.scss']
})

export class RepertoireNavHeaderComponent {
  @Output() setFirstPage: EventEmitter<number> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute) { }

  setPage() {
    this.setFirstPage.emit(1);
  }

  isLinkActive(url: string): boolean {
    return ('/' + this.activatedRoute.snapshot.url.join('/')) === url;
  }

}
