import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSubGroupComponent } from './employee-sub-group.component';

describe('EmployeeCaruselComponent', () => {
  let component: EmployeeSubGroupComponent;
  let fixture: ComponentFixture<EmployeeSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSubGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
