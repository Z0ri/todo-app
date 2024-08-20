import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { map, Observable, skip, Subject, take, takeUntil } from 'rxjs';

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
export class ProjectComponent implements OnInit {
  projectTitle: string = '';
  projectId: string = '';
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

  ngOnInit(): void {    
    this.getTasks(); //get tasks from DB

    //(client) create new task
    this.sharingService.taskSubject
      .pipe(skip(1))
      .subscribe((taskName) => {
        this.todo.push(taskName); // Create task element
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

    // Update tasks in the database
    this.updateTasks('todo', this.todoObj);
    this.updateTasks('doing', this.doingObj);
    this.updateTasks('done', this.doneObj);
  }

  //get tasks in the database & add them to the view
  private getTasks(){
    console.log("ciao");
    this.http.get(`https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}/projects/${this.dataService.projectData.id}/tasks.json`)
    .subscribe((response: any) => {
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
    });
  }

  // Transforming arrays into objects
  private arrayToObj(array: string[], obj: { [key: string]: string }) {
    array.forEach(task => {
      const newKey = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      obj[newKey] = task;
    });
  }

  // Update tasks section in the database
  private updateTasks(sectionName: string, obj: { [key: string]: string }) {
      this.http.patch(
        `https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get('user')}/projects/${this.dataService.projectData.id}/tasks/${sectionName}.json`,
        obj
      ).subscribe();
  }

  createTask() {
    // Open dialog window
    this.dialog.open(ProjectFormComponent, {
      data: {}
    });
  }

  deleteTask(task: string) {
    // Delete from todo
    const todoIndex = this.todo.indexOf(task);
    if (todoIndex !== -1) {
      this.todo.splice(todoIndex, 1);
    }
    // Delete from doing
    const doingIndex = this.doing.indexOf(task);
    if (doingIndex !== -1) {
      this.doing.splice(doingIndex, 1);
    }
    // Delete from done
    const doneIndex = this.done.indexOf(task);
    if (doneIndex !== -1) {
      this.done.splice(doneIndex, 1);
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
        event.currentIndex
      );
    }
  }
}