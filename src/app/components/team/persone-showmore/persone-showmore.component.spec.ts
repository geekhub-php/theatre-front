import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PersoneShowmoreComponent } from './persone-showmore.component';

describe('PersoneShowmoreComponent', () => {
  let component: PersoneShowmoreComponent;
  let fixture: ComponentFixture<PersoneShowmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersoneShowmoreComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoneShowmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
