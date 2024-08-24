import { Component, inject, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingServiceService } from '../../services/sharing-service.service';
import { HttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-desk-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatMenuModule
  ],
  templateUrl: './desk-form.component.html',
  styleUrl: './desk-form.component.css'
})
export class DeskFormComponent {
  http: HttpClient = inject(HttpClient);
  constructor(
    private sharingService: SharingServiceService,
    private cookieService: CookieService,
    private dataService: DataService
  ){}
  createProject(form: NgForm){
    //set project's data in service object
    this.dataService.projectData.title = form.value.title;
    this.dataService.projectData.description = form.value.description;

    if(form.value.title){
        //data insertion in DB
        this.http.post(
          `https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}/projects.json`,
          this.dataService.projectData
        ).subscribe((response: any) => {
          this.dataService.projectData.id = response.name;
          this.sharingService.createCard$.next(response.name);//subject to notify to create project card
          this.setId();
        });
        }
    }
  
  setId(){
    //set cookie for id
    this.cookieService.set("projectId", this.dataService.projectData.id);
    //set correct id in DB
    this.http.patch(
      `https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}/projects/${this.dataService.projectData.id}.json`, 
      { id: this.dataService.projectData.id }  // Replace `newId` with the new value for the `id` field
    ).subscribe();
    console.log(this.dataService.projectData.id);
  }
}
