import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSnackbarComponent } from './project-snackbar.component';

describe('ProjectSnackbarComponent', () => {
  let component: ProjectSnackbarComponent;
  let fixture: ComponentFixture<ProjectSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
