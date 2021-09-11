import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VisitComponent } from './visit.component';

describe('VisitComponent', () => {
  let component: VisitComponent;
  let fixture: ComponentFixture<VisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
