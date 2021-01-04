import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTrusteesComponent } from './board-trustees.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BoardTrusteesComponent', () => {
  let component: BoardTrusteesComponent;
  let fixture: ComponentFixture<BoardTrusteesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardTrusteesComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpClientTestingModule);
    fixture = TestBed.createComponent(BoardTrusteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
