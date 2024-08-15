import { Component, inject, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingServiceService } from '../../services/sharing-service.service';
import { HttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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
    MatDialogClose
  ],
  templateUrl: './desk-form.component.html',
  styleUrl: './desk-form.component.css'
})
export class DeskFormComponent {
  http: HttpClient = inject(HttpClient);
  constructor(
    private sharingService: SharingServiceService,
    private cookieService: CookieService
  ){}
  createProject(form: NgForm){
    let title = form.value.title;
    let description = form.value.description;
    const data = {
      title: title,
      description: description,
      tasks: {
        task1: "sample"
      }
    };
    //send card's data via client
    this.sharingService.cardInfoSubject.next(data);
    //data insertion in DB
    // this.http.post(
    //   `https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}/projects.json`,
    //   data
    // ).subscribe((response) => {
    //   this.sharingService.createCardSubject.next();
    // });
  }
}
