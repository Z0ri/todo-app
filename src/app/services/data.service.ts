import { HttpClient } from '@angular/common/http';
import { ComponentRef, inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CardComponent } from '../components/card/card.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public http: HttpClient = inject(HttpClient);
  public projectData = {
    id: "",
    title: "",
    description: ""
  }
  public cards: ComponentRef<CardComponent>[] = [];

  constructor(private cookieService: CookieService){}
  addCard(card: ComponentRef<CardComponent>){
    this.cards.push(card);
  }
}
