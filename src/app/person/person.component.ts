import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../core/service/gateway.service';
import { Employee } from '../core/model/Employee';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person: Employee;
  gallery: any;

  constructor(
    private router: ActivatedRoute,
    private gatewayService: GatewayService
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const slug = this.router.snapshot.paramMap.get('slug');
    console.log(slug);
    this.gatewayService.getEmployees(slug).subscribe((res) => {
      this.person = res.body.employees.find(employee => employee.slug === slug);
      console.log(this.person);
      this.gallery = this.person.gallery;
      console.log(res.body);
      console.log(this.gallery);
    });
  }

}
