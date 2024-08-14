import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskFormComponent } from './desk-form.component';

describe('DeskFormComponent', () => {
  let component: DeskFormComponent;
  let fixture: ComponentFixture<DeskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
