import { Component, Input } from '@angular/core';
import { Employee } from 'app/store/employee/Employee';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input() person: Employee;

  constructor() { }
}
