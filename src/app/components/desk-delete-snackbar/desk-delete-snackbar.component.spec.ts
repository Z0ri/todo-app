import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskDeleteSnackbarComponent } from './desk-delete-snackbar.component';

describe('DeskDeleteSnackbarComponent', () => {
  let component: DeskDeleteSnackbarComponent;
  let fixture: ComponentFixture<DeskDeleteSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskDeleteSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskDeleteSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
