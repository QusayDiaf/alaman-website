import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Technical } from './technical';

describe('Technical', () => {
  let component: Technical;
  let fixture: ComponentFixture<Technical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Technical],
    }).compileComponents();

    fixture = TestBed.createComponent(Technical);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
