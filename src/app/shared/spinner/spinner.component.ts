import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="d-flex justify-content-center">
      <div class="spinner-grow text-danger text-center" [style.display]='visible ? "block" : "none"' role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    `
})
export class SpinnerComponent implements OnInit {
  visible = false;
  @Input() name: string;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.subject.subscribe((value: { load: boolean, name: string }) => {
      if (this.name !== value.name) return;
      this.visible = value.load;
    });
  }
}
