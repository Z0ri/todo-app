import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SharingServiceService } from '../../services/sharing-service.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
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
export class CardComponent {
  projectTitle: string = "";
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() projectId: string = '';
  @Input() tags: string[] = [];

  constructor(
    private sharingService: SharingServiceService,
    private dataService: DataService
  ){}

  onOpen(title: string){
    //sarà inutile
    this.sharingService.cardTitleSubject.next(title);
    this.dataService.projectData.id = this.projectId;
  }

  deleteProject(){
    //delete project
  }
}
