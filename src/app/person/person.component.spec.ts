import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxGalleryModule } from 'ngx-gallery';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NgxGalleryModule,
        SpinnerModule,
        NgxJsonLdModule
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
