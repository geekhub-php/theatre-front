import { Component, OnInit } from '@angular/core';
import { VisuallyImpairedService } from '../../services/visually-impaired/visually-impaired.service';


@Component({
  selector: 'app-visually-impaired',
  templateUrl: './visually-impaired.component.html',
  styleUrls: ['./visually-impaired.component.scss']
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

  resetSettings() {
    this.visuallyImpairedService.resetSettings();
  }
}
