import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-spinner',
  styleUrls: ['./spinner.component.scss'],
  template: `
    <div class="d-flex justify-content-center" [class.spinner]="visible">
      <div class="text-center spinner__content" [style.display]='visible ? "block" : "none"' role="status">
        <ng-lottie [options]="options" ></ng-lottie>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    `
})
export class SpinnerComponent implements OnInit {
  visible = false;
  @Input() name: string;
  options: AnimationOptions = {
    path: '../../../../assets/images/theatre_loading/theatre_loading.json'
  }


  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.subject.subscribe((value: { load: boolean, name: string }) => {
      if (this.name !== value.name) return;
      this.visible = value.load;
    });
  }
}

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
