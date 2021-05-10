import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsHeaderComponent } from './persons-header.component';

describe('PersonsHeaderComponent', () => {
  let component: PersonsHeaderComponent;
  let fixture: ComponentFixture<PersonsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
