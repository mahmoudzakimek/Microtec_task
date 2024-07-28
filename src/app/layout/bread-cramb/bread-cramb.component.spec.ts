import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrambComponent } from './bread-cramb.component';

describe('BreadCrambComponent', () => {
  let component: BreadCrambComponent;
  let fixture: ComponentFixture<BreadCrambComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadCrambComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadCrambComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
