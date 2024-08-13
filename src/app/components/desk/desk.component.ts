import { Component, inject } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CdkDrag,
    CdkDropList,
    MatTooltipModule,
    MatIcon
  ],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.css'
})
export class DeskComponent {
  readonly dialog = inject(MatDialog);

  constructor(private router: Router){}
  createTask(){
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {},
    });

    //When dialog is closed
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  doing = ['eat', 'jump', 'exercise', 'watch TV series', 'float'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log("todo",this.todo);
    console.log("doing",this.doing);
    console.log("done",this.done);

  }
}
