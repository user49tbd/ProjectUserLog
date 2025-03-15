import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoGenComponent } from './logo-gen.component';

describe('LogoGenComponent', () => {
  let component: LogoGenComponent;
  let fixture: ComponentFixture<LogoGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
