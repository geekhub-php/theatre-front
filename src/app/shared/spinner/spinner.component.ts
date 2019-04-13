import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-grow" *ngIf="inProgress" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
