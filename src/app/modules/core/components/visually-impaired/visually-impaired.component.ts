import { Component, OnInit } from '@angular/core';
import { VisuallyImpairedService } from '../../../../services/visually-impaired.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-visually-impaired',
  templateUrl: './visually-impaired.component.html',
  styleUrls: ['./visually-impaired.component.scss']
})
export class VisuallyImpairedComponent implements OnInit {
  trigger = this.visuallyImpairedService.triggerVisuallyImpaired;
  options: AnimationOptions = {
    path: 'assets/animations/theatre_eye_settings.json',
  };
  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '220px',
    margin: '0 auto',
    paddingBottom: '10px'
  };

  constructor(private visuallyImpairedService: VisuallyImpairedService) {
  }

  ngOnInit() {
  }

  reduceFont() {
    this.visuallyImpairedService.setReduceFont();
  }

  zoomFont() {
    this.visuallyImpairedService.setZoomFont();
  }

  inverseColor() {
    this.visuallyImpairedService.inverseColors();
  }

  setSepia() {
    this.visuallyImpairedService.setSepia();
  }

  setBlackWhite() {
    this.visuallyImpairedService.setBlackWhite();
  }

  setWhiteBlack() {
    this.visuallyImpairedService.setWhiteBlack();
  }

  resetSettings() {
    this.visuallyImpairedService.resetSettings();
  }
}
