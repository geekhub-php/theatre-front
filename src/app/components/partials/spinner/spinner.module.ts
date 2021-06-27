import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    LottieModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule {
}
