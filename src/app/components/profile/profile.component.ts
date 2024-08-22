import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { SharingServiceService } from '../../services/sharing-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  nick: string = '';
  nProjects: number = 0;
  nTasksCompleted: number = 0;
  nTasksCreated: number = 0;

  constructor(
    private sharingService: SharingServiceService,
  ){}
  ngOnInit(): void {
    this.getUserNick();
    this.getProjectsNumber();
    this.getTasksCompleted();
    this.getTasksCreated();
  }
  //get the profile's username
  getUserNick(){
    this.sharingService.getCurrentUser()
    .subscribe((response: any)=>this.nick=response);
  }
  //get number of projects created
  getProjectsNumber(){
    this.sharingService.getProjects()
    .subscribe((response: any)=>{
      if(response != null && response != undefined){
        for (let key of Object.keys(response)) {
          this.nProjects += 1;
        }
      }
    });
  }
  getTasksCompleted(){
    this.sharingService.getProjects()
    .subscribe((response:any)=>{
      if(response!=null && response!=undefined){
        for(let key of Object.keys(response)){
          for(let k of Object.keys(response[key]['tasks'])){
            if(k == "done"){
              for(let t of Object.keys(response[key]['tasks'][k])){
                this.nTasksCompleted += 1;
              }
            }
          }
        }
      }
    });
  }
  getTasksCreated(){
    this.sharingService.getProjects()
    .subscribe((response:any)=>{
      if(response!=null && response!=undefined){
        for(let key of Object.keys(response)){
          for(let k of Object.keys(response[key]['tasks'])){
            this.nTasksCreated += 1;
          }
        }
      }
    });
  }
}
