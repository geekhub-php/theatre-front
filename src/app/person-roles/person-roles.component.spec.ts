import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonRolesComponent } from './person-roles.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from '../shared/spinner/spinner.module';

describe('PersonRolesComponent', () => {
  let component: PersonRolesComponent;
  let fixture: ComponentFixture<PersonRolesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonRolesComponent ],
      imports: [HttpClientModule, RouterTestingModule, SpinnerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
