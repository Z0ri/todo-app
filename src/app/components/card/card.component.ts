import {Component, inject, Input, OnInit} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SharingServiceService } from '../../services/sharing-service.service';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterModule,
    MatIcon
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  visible: boolean = true;
  taskCompleted: number = 0;
  http: HttpClient = inject(HttpClient);
  projectTitle: string = "";
  //*cardRef
  @Input() title: string = '';        
  @Input() description: string = '';
  @Input() projectId: string = '';

  constructor(
    private sharingService: SharingServiceService,
    private dataService: DataService,
    private cookieService: CookieService
  ){}
  ngOnInit(): void {
    this.http.get(`https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}/projects/${this.projectId}/tasks/done.json`)
    .subscribe((response)=>{
      if(response!=null && response!=undefined){
        for(let key of Object.keys(response)){
          this.taskCompleted+=1;
        }
      }
    })
  }

  onOpen(title: string){
    this.dataService.projectData.id = this.projectId; //set id to opened project's id
    this.sharingService.cardInfo$.next(title); //sarà inutile(?)
  }
  //delete project
  deleteProject(){
    this.visible = false; //delete project in the DOM
    this.sharingService.deleteProject(this.projectId).subscribe()//delete project from DB
    this.sharingService.deleteProject$.next(); //notify to open snackbar
  }
}
