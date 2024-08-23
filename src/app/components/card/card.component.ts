import {Component, inject, Input} from '@angular/core';
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
export class CardComponent{
  visible: boolean = true;
  http: HttpClient = inject(HttpClient);
  projectTitle: string = "";
  //*cardRef
  @Input() title: string = '';        
  @Input() description: string = '';
  @Input() projectId: string = '';

  constructor(
    private sharingService: SharingServiceService,
    private dataService: DataService,
  ){}

  onOpen(title: string){
    this.dataService.projectData.id = this.projectId; //set id to opened project's id
    this.sharingService.cardInfo$.next(title); //sarà inutile(?)
  }
  //delete project
  deleteProject(){
    this.visible = false; //delete project in the DOM
    this.sharingService.deleteProject(this.projectId).subscribe()//delete project from DB
  }
}
