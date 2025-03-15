import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgOptComponent } from './msg-opt.component';

describe('MsgOptComponent', () => {
  let component: MsgOptComponent;
  let fixture: ComponentFixture<MsgOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgOptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
