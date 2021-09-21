import { Component, OnInit } from '@angular/core';
import { VisuallyImpairedService } from 'app/services/visually-impaired.service';

import { sideBarAnimation } from 'app/utilities/side-bar-animation';

@Component({
  selector: 'app-visually-impaired',
  templateUrl: './visually-impaired.component.html',
  styleUrls: ['./visually-impaired.component.scss'],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})
export class VisuallyImpairedComponent implements OnInit {
  trigger = this.visuallyImpairedService.triggerVisuallyImpaired;

  constructor(private visuallyImpairedService: VisuallyImpairedService) { }

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
