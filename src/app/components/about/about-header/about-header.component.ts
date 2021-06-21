import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about-header',
  templateUrl: './about-header.component.html',
  styleUrls: ['./about-header.component.scss']
})
export class AboutHeaderComponent implements OnInit {
  @Input() PersonType;
  selectedClass = 'selected';
  selectedEpoch;

  constructor() { }

  ngOnInit(): void {
    if (this.PersonType) {
      if (this.PersonType === 'epoch') {
        this.selectedEpoch = this.selectedClass;
      }
    }
  }
}
