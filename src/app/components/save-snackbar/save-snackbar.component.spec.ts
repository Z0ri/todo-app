import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSnackbarComponent } from './save-snackbar.component';

describe('SaveSnackbarComponent', () => {
  let component: SaveSnackbarComponent;
  let fixture: ComponentFixture<SaveSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
