import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCComponent } from './btn-c.component';

describe('BtnCComponent', () => {
  let component: BtnCComponent;
  let fixture: ComponentFixture<BtnCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
