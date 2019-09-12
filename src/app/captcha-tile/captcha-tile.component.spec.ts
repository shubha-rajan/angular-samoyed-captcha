import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaTileComponent } from './captcha-tile.component';

describe('CaptchaTileComponent', () => {
  let component: CaptchaTileComponent;
  let fixture: ComponentFixture<CaptchaTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
