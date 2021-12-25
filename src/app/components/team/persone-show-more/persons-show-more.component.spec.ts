import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonsShowMoreComponent } from './persons-show-more.component';

describe('PersoneShowmoreComponent', () => {
  let component: PersonsShowMoreComponent;
  let fixture: ComponentFixture<PersonsShowMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonsShowMoreComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsShowMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
