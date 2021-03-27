import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubrowComponent } from './subrow.component';

describe('SubrowComponent', () => {
  let component: SubrowComponent;
  let fixture: ComponentFixture<SubrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
