import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { playerFactory, SpinnerComponent } from './spinner.component';
import { LottieModule } from 'ngx-lottie';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule {
}
