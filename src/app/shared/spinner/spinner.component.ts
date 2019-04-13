import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-grow" *ngIf="inProgress" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  inProgress = false;

  @Input() name: string;

  constructor() { }
}
