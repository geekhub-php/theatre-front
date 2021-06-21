import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-persons-header',
  templateUrl: './persons-header.component.html',
  styleUrls: ['./persons-header.component.scss']
})
export class PersonsHeaderComponent implements OnInit {
  @Input() PersonType;

  constructor() { }

  ngOnInit(): void {
    if(this.PersonType){
      console.log(this.PersonType);
    }
  }

}
