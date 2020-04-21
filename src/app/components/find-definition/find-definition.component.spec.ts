import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDefinitionComponent } from './find-definition.component';

describe('FindDefinitionComponent', () => {
  let component: FindDefinitionComponent;
  let fixture: ComponentFixture<FindDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
