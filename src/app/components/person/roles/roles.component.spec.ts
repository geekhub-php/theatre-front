import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { RolesComponent } from './roles.component';
import { SpinnerModule } from '../../partials/spinner/spinner.module';

describe('PersonRolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesComponent ],
      imports: [HttpClientModule, RouterTestingModule, SpinnerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
