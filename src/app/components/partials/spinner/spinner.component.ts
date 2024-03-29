import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-spinner',
  styleUrls: [ './spinner.component.scss' ],
  template: `
    <div class="d-flex justify-content-center" [class.spinner]="visible">
      <div class="text-center spinner__content" [class.displaySpinner]="visible" role="status">
        <ng-lottie [options]="options"></ng-lottie>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})
export class SpinnerComponent implements OnInit {
  options: AnimationOptions = {
    path: 'assets/json/theatre_loading.json'
  };
  visible = false;
  @Input() name: string;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.subject.subscribe((value: { load: boolean, name: string }) => {
      if (this.name !== value.name) return;
      this.visible = value.load;
    });
  }
}

export const playerFactory = () => {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
};
