import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanEnergySummaryComponent } from './clean-energy-summary.component';

describe('CleanEnergySummaryComponent', () => {
  let component: CleanEnergySummaryComponent;
  let fixture: ComponentFixture<CleanEnergySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanEnergySummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanEnergySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
