import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { SharingServiceService } from '../../services/sharing-service.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CdkDrag,
    CdkDropList,
    MatTooltipModule,
    MatIcon
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  readonly dialog = inject(MatDialog);

  todo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing: string[] = ['eat', 'jump', 'exercise', 'watch TV series', 'float'];
  done: string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  ngOnInit(): void {
    this.sharingService.taskSubject.subscribe((taskName) => {
      this.todo.push(taskName);
    });
  }

  constructor(
    private router: Router,
    private sharingService: SharingServiceService
  ){}

  createTask(){
    //dialog window opening
    this.dialog.open(ProjectFormComponent, {
      data: {},
    });
  }

  deleteTask(task: string){
    // delete from todo
    if (this.todo.indexOf(task) !== -1) {
      this.todo.splice(this.todo.indexOf(task), 1);
    }
    // delete from doing
    if (this.doing.indexOf(task) !== -1) {
      this.doing.splice(this.doing.indexOf(task), 1);
    }
    // delete from done
    if (this.done.indexOf(task) !== -1) {
      this.done.splice(this.done.indexOf(task), 1);
    }
  }

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
  }
}
