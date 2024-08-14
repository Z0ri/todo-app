import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeskFormComponent } from '../desk-form/desk-form.component';

@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [
    MatButtonModule,
    CdkDrag,
    CdkDropList,
    MatTooltipModule,
    MatIcon,
  ],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.css'
})
export class DeskComponent {
  readonly dialog = inject(MatDialog);
  createProject(){
    this.dialog.open(DeskFormComponent);
  }
}
