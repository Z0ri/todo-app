import { Component, inject, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeskFormComponent } from '../desk-form/desk-form.component';
import { CardComponent } from "../card/card.component";
import { SharingServiceService } from '../../services/sharing-service.service';
import { skip } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  http: HttpClient = inject(HttpClient);
  readonly dialog = inject(MatDialog);
  @ViewChild('cardContainer', { read: ViewContainerRef }) cardContainer!: ViewContainerRef;

  constructor(private sharingService: SharingServiceService){}

  ngAfterViewInit(): void {
    this.sharingService.cardInfoSubject
    .pipe(skip(1))
    .subscribe((data)=>{
      this.createCardProject(data.title, data.description);
    });
  }

  openForm(){
    this.dialog.open(DeskFormComponent);
  }

  createCardProject(title: string, description: string){
    // Create a CardComponent
    const cardRef: ComponentRef<CardComponent> = this.cardContainer.createComponent(CardComponent);
    // Create card
    cardRef.instance.title = title;
    cardRef.instance.description = description;
    // cardRef.instance.tags = tags;
  }
  
}
