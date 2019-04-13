import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  inProgress: boolean;

  @Output() show: EventEmitter<string> = new EventEmitter();
  @Output() hide: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  showSpinner() {
    if (this.inProgress === true) this.show.emit('in progress');
  }
  hideSpinner() {
    if (this.inProgress === false) this.hide.emit('finished');
  }
}
