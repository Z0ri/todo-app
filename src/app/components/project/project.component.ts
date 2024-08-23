import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { SharingServiceService } from '../../services/sharing-service.service';
import { HttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import {skip} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProjectSnackbarComponent } from '../project-snackbar/project-snackbar.component';
import { SaveSnackbarComponent } from '../save-snackbar/save-snackbar.component';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    CdkDrag,
    CdkDropList,
    MatTooltipModule,
    MatIcon,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  projectTitle: string = '';
  todo: string[] = [];
  todoObj: { [key: string]: string } = {};
  doing: string[] = [];
  doingObj: { [key: string]: string } = {};
  done: string[] = [];
  doneObj: { [key: string]: string } = {};

  constructor(
    private sharingService: SharingServiceService,
    private dataService: DataService,
    private cookieService: CookieService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  openSnackBar():void {
    let duration = 2;
    this._snackBar.openFromComponent(ProjectSnackbarComponent, {
      duration: duration * 1000,
    });
  }
  openSaveSnackBar():void {
    let duration = 2;
    this._snackBar.openFromComponent(SaveSnackbarComponent, {
      duration: duration * 1000,
    });
  }

  ngOnInit(): void {
    this.getTasks(); //get tasks from DB

    //create task elements
    this.sharingService.task$
    .pipe(skip(1))
    .subscribe((taskName) => {
      this.todo.push(taskName); // Create task element
      this.openSnackBar(); // Open snackbar
    });

    //Get new project's name
    this.sharingService.cardInfo$
    .subscribe((title: string)=>{
      this.projectTitle = title;
    })
  }

  save(){
      //Transform arrays to objects
      this.arrayToObj(this.todo, this.todoObj);
      this.arrayToObj(this.doing, this.doingObj);
      this.arrayToObj(this.done, this.doneObj);
      
      //update tasks in DB
      this.updateTasks('todo', this.todoObj);
      this.updateTasks('doing', this.doingObj);
      this.updateTasks('done', this.doneObj);

      this.openSaveSnackBar();
  }

  //get tasks in the database & add them to the view
  private getTasks(){
    this.dataService.getTasks()
    .subscribe((response: any) => {
      if(response!=null || response!=undefined){ //if the "tasks" section doesn't exist yet, response is undefined/null
        //insert inside the arrays the tasks inside the view
        for(let key of Object.keys(response)){
          for(let k of Object.keys(response[key])){
            switch(key){
              case "todo":
                if(!this.todo.includes(response[key][k])){
                  this.todo.push(response[key][k]);
                }
                break;
              case "doing":
                if(!this.doing.includes(response[key][k])){
                  this.doing.push(response[key][k]);
                }
                break;
              case "done":
                if(!this.done.includes(response[key][k])){
                  this.done.push(response[key][k]);
                }
                break;
            }
          }
        }
      }
    });
  }

  // Transforming arrays into objects
  private arrayToObj(array: string[], obj: { [key: string]: string }) {
    if(array.length>0){
      array.forEach(task => {
        const newKey = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        obj[newKey] = task;
      });
    }
  }

  // Update tasks in DB
  private updateTasks(sectionName: string, obj: { [key: string]: string }) {
    this.http.put(
      `https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get('user')}/projects/${this.dataService.projectData.id}/tasks/${sectionName}.json`,
      obj
    ).subscribe();
  }

  // Open create task form dialog window
  createTask() {
    this.dialog.open(ProjectFormComponent, {
      data: {}
    });
  }

  //delete task from DB
  deleteTask(task: string) {
    let eliminated = false; //variable to check if a task with a name has been deleted from a list to stop others to check for it
    // delete task element
    // delete from todo
    const todoIndex = this.todo.indexOf(task);
    if (todoIndex !== -1) {
      this.todo.splice(todoIndex, 1);
      eliminated = true;
    }
    if(!eliminated){
      // delete from doing
      const doingIndex = this.doing.indexOf(task);
      if (doingIndex !== -1) {
        this.doing.splice(doingIndex, 1);
        eliminated = true;
      }
    }
    if(!eliminated){
      // delete from done
      const doneIndex = this.done.indexOf(task);
      if (doneIndex !== -1) {
        this.done.splice(doneIndex, 1);
        eliminated = true;
      }
    }
  }

  //function that handles the element's drag & drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}