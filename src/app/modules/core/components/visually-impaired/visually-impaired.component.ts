import { Component, OnInit } from '@angular/core';
import { VisuallyImpairedService } from 'app/services/visually-impaired.service';

import { sideBarAnimation } from 'app/utilities/side-bar-animation';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';

@Component({
  selector: 'app-visually-impaired',
  templateUrl: './visually-impaired.component.html',
  styleUrls: ['./visually-impaired.component.scss'],
  animations: sideBarAnimation({ sideBlock: 'sideBlock' , closeArea: 'closeArea'})
})
export class VisuallyImpairedComponent implements OnInit {
  isVisuallyImpairedActive = false;

  constructor(
    private visuallyImpairedService: VisuallyImpairedService,
    private sidebarService: SidebarService) {
    this.sidebarService.subject.subscribe(state => {
      this.isVisuallyImpairedActive = state.isActive && state.barName === ESidebar.settings;
    });
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

  openVisuallyImpaired() {
    this.sidebarService.open(ESidebar.settings);
  }

  closeVisuallyImpaired() {
    this.sidebarService.close(ESidebar.settings);
  }
}
