import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskSnackBarComponent } from './desk-snack-bar.component';

describe('DeskSnackBarComponent', () => {
  let component: DeskSnackBarComponent;
  let fixture: ComponentFixture<DeskSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskSnackBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
