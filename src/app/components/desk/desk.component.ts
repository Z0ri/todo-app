import { Component, inject, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeskFormComponent } from '../desk-form/desk-form.component';
import { CardComponent } from "../card/card.component";
import { SharingServiceService } from '../../services/sharing-service.service';
import { HttpClient, withFetch } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeskSnackBarComponent } from '../desk-snack-bar/desk-snack-bar.component';

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
  private _snackBar = inject(MatSnackBar);
  http: HttpClient = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  @ViewChild('cardContainer', { read: ViewContainerRef }) cardContainer!: ViewContainerRef;

  constructor(
    private sharingService: SharingServiceService,
    private cookieService: CookieService,
    private dataService: DataService,
  ){}

  openSnackBar(seconds: number) {
    this._snackBar.openFromComponent(DeskSnackBarComponent, {
      duration: seconds * 1000,
    });
  }

  ngAfterViewInit(): void {
    //generate all cards that are inside the DB for that user (unefficient, fix: http request with user id)
    this.sharingService.getUsers()
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
    this.sharingService.createCard$
    .subscribe(()=>{
      this.createCardProject(this.dataService.projectData.title, this.dataService.projectData.description, this.dataService.projectData.id);
      this.openSnackBar(2); // open snackbar
    });
  }
  //open project creation form
  openForm(){
    this.dialog.open(DeskFormComponent);
  }
  //create project's card
  createCardProject(title: string, description: string, id: string) {
    // Create a new component instance
    const cardRef: ComponentRef<CardComponent> = this.cardContainer.createComponent(CardComponent);

    // Set input properties for the component instance
    cardRef.instance.title = title;
    cardRef.instance.description = description;
    cardRef.instance.projectId = id;

    // Optionally store or manage the component reference
    this.dataService.addCard(cardRef);
  }
}
