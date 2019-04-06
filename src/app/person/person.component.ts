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
    this.getPerson();
  }

  getPerson() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gatewayService.getEmployeeBySlug(slug).subscribe((res) => {
      this.person = res.body;
      this.gallery = res.body.gallery;
    });
  }
}
