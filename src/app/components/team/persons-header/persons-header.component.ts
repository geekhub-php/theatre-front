import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-persons-header',
  templateUrl: './persons-header.component.html',
  styleUrls: ['./persons-header.component.scss']
})
export class PersonsHeaderComponent implements OnInit {
  @Input() PersonType;
  selectedClass = 'selected';
  selectedAdm;
  selectedArt;
  selectedCreat;

  constructor() {
  }

  ngOnInit(): void {
    if (this.PersonType) {
      if (this.PersonType === 'director' || this.PersonType === 'administrative' || this.PersonType === 'deputies' || this.PersonType === 'administrative-accounting') {
        this.selectedAdm = this.selectedClass;
      }
      if (this.PersonType === 'art-core' || this.PersonType === 'art-production') {
        this.selectedArt = this.selectedClass;
      }
      if (this.PersonType === 'actors' || this.PersonType === 'ballet' || this.PersonType === 'orchestra' || this.PersonType === 'creative') {
        this.selectedCreat = this.selectedClass;
      }
    }
  }

}
