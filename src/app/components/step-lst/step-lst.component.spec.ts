import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLstComponent } from './step-lst.component';

describe('StepLstComponent', () => {
  let component: StepLstComponent;
  let fixture: ComponentFixture<StepLstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepLstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
