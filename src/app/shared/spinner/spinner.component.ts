import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-grow" [style.display]='visible ? "block" : "none"' role="status">
      <span class="sr-only">Loading...</span>
    </div>
    `
})
export class SpinnerComponent {
  visible = false;
  @Input() name: string;

  constructor(private loaderService: LoaderService) {
    this.loaderService.subject.subscribe((value: {load: boolean, name: string}) => {
      if (this.name !== value.name) return;
      this.visible = value.load;
    });
  }
}
