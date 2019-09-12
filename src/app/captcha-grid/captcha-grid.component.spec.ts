import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaGridComponent } from './captcha-grid.component';

describe('CaptchaGridComponent', () => {
  let component: CaptchaGridComponent;
  let fixture: ComponentFixture<CaptchaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
