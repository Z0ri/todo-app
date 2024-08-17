import { Component, inject, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeskFormComponent } from '../desk-form/desk-form.component';
import { CardComponent } from "../card/card.component";
import { SharingServiceService } from '../../services/sharing-service.service';
import { skip } from 'rxjs';
import { HttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [
    MatButtonModule,
    CdkDrag,
    CdkDropList,
    MatTooltipModule,
    MatIcon
],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.css'
})
export class DeskComponent implements AfterViewInit{
  http: HttpClient = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  @ViewChild('cardContainer', { read: ViewContainerRef }) cardContainer!: ViewContainerRef;

  constructor(
    private sharingService: SharingServiceService,
    private cookieService: CookieService,
    private dataService: DataService
  ){}

  ngAfterViewInit(): void {
    //generate all cards that are inside the DB
    this.http.get<any>("https://todo-app-8ce90-default-rtdb.firebaseio.com/users.json")
    .subscribe((response)=>{
      for (let id in response) {
        const user = response[id];
        //get the projects of just the logged person
        if(id == this.cookieService.get("user")){
          //check if user has any project
          if (user.projects) {
            for (let projectId in user.projects) {
                const project = user.projects[projectId];
                this.createCardProject(project.title, project.description, projectId);
            }
          }
        }
      }
    });
    //get card info and create card client
    this.sharingService.createCardSubject
    .subscribe(()=>{
      this.createCardProject(this.dataService.projectData.title, this.dataService.projectData.description, this.dataService.projectData.id);
    });
  }
  //open project creation form
  openForm(){
    this.dialog.open(DeskFormComponent);
  }
  //create project's card
  createCardProject(title: string, description: string, id: string){
    // Create a CardComponent
    const cardRef: ComponentRef<CardComponent> = this.cardContainer.createComponent(CardComponent);
    // Create card
    cardRef.instance.title = title;
    cardRef.instance.description = description;
    cardRef.instance.projectId = id;
    // cardRef.instance.tags = tags;
  }
  
}
