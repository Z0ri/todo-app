import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { SharingServiceService } from '../../services/sharing-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(
    private sharingService: SharingServiceService
  ){}
  getUserNick(){
    //get user's nick
  }
  getProjectsNumber(){
    let nProjects: number = 0;
    this.sharingService.getProjects()
    .subscribe((response: any)=>{
      for (let i = 0; i < Object.keys(response).length; i++) {
        nProjects += 1;
      }
    });
    return nProjects;
  }
}
