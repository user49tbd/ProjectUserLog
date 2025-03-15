import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgComponent } from './msg.component';

describe('MsgComponent', () => {
  let component: MsgComponent;
  let fixture: ComponentFixture<MsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
