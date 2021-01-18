import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { PersonRolesComponent } from '../person-roles/person-roles.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent, PersonRolesComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NgxGalleryModule,
        SpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
