import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Techs } from './techs';

describe('Techs', () => {
  let component: Techs;
  let fixture: ComponentFixture<Techs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Techs],
    }).compileComponents();

    fixture = TestBed.createComponent(Techs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
