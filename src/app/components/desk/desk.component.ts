import { Component, inject, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeskFormComponent } from '../desk-form/desk-form.component';
import { CardComponent } from "../card/card.component";
import { SharingServiceService } from '../../services/sharing-service.service';
import { skip } from 'rxjs';

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
  readonly dialog = inject(MatDialog);
  @ViewChild('cardContainer', { read: ViewContainerRef }) cardContainer!: ViewContainerRef;

  constructor(private sharingService: SharingServiceService){}

  ngAfterViewInit(): void {
    this.sharingService.createCardSubject.subscribe(()=>{
      this.createProject();
    });
  }

  openForm(){
    this.dialog.open(DeskFormComponent);
  }

  createProject(){
    // Create a CardComponent
    const cardRef: ComponentRef<CardComponent> = this.cardContainer.createComponent(CardComponent);
    //http request
    
    cardRef.instance.title = "";
    cardRef.instance.description = "";
    // cardRef.instance.tags = tags;
  }
  
}
