import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTrusteesComponent } from './board-trustees.component';

describe('BoardTrusteesComponent', () => {
  let component: BoardTrusteesComponent;
  let fixture: ComponentFixture<BoardTrusteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardTrusteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTrusteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
