import {Component, Input} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SharingServiceService } from '../../services/sharing-service.service';

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
  @Input() tags: string[] = [];

  constructor(private sharingService: SharingServiceService){}

  onOpen(title: string){
    this.sharingService.cardTitleSubject.next(title);
  }
}
