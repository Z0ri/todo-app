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
import { map, Observable, skip } from 'rxjs';

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
export class ProjectComponent implements OnInit, OnDestroy{
  http: HttpClient = inject(HttpClient);
  projectTitle: string = "";
  readonly dialog = inject(MatDialog);
  

  todo: string[] = [];
  todoObj: { [key: string]: string } = {};
  doing: string[] = [];
  doingObj: { [key: string]: string} = {};
  done: string[] = [];
  doneObj: {[key:string]:string} = {};

  ngOnInit(): void {
    //get task's name
    this.sharingService.taskSubject.
    pipe(skip(1))
    .subscribe((taskName) => {
      this.todo.push(taskName); //create task element
    });
    //get project's name
    this.sharingService.cardTitleSubject.subscribe((title)=>{
      this.projectTitle = title;
    })
  }

  constructor(
    private sharingService: SharingServiceService,
    private dataService: DataService,
    private cookieService: CookieService
  ){}

  ngOnDestroy(): void {
    this.arrayToObj(this.todo, this.todoObj);
    this.arrayToObj(this.doing, this.doingObj);
    this.arrayToObj(this.done, this.doneObj);
    //UPDATE
    //todo
    this.updateTasks("todo",this.todoObj);
    //doing
    this.updateTasks("doing",this.doingObj);
    //done
    this.updateTasks("done",this.doneObj);
  }
  //transforming arrays into objects
  arrayToObj(array: any[], obj: { [key: string]: string }){
    array.forEach(task => {
      const newKey = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      obj[newKey] = task;
    });   
  }
  //update taks section in DB
  updateTasks(sectionName: string, obj: {[key:string]:string}){
    this.http.patch(
      "https://todo-app-8ce90-default-rtdb.firebaseio.com/users/" +
        this.cookieService.get("user") +
        "/projects/" +
        this.dataService.projectData.id +
        "/tasks/"+sectionName+".json",
      obj
    ).subscribe();
  }

  createTask(){
    //dialog window opening
    this.dialog.open(ProjectFormComponent, {
      data: {}
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