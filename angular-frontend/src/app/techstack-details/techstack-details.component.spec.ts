import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechstackDetailsComponent } from './techstack-details.component';

describe('TechstackDetailsComponent', () => {
  let component: TechstackDetailsComponent;
  let fixture: ComponentFixture<TechstackDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechstackDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechstackDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
