import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluadosComponent } from './evaluados.component';

describe('EvaluadosComponent', () => {
  let component: EvaluadosComponent;
  let fixture: ComponentFixture<EvaluadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
