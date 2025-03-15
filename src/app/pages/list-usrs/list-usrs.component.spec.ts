import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsrsComponent } from './list-usrs.component';

describe('ListUsrsComponent', () => {
  let component: ListUsrsComponent;
  let fixture: ComponentFixture<ListUsrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
