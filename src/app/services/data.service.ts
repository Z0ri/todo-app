import { HttpClient } from '@angular/common/http';
import { ComponentRef, inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CardComponent } from '../components/card/card.component';
import { User } from '../../models/User';

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

  getTasks(): Observable<any> {
    return this.http.get(`https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}/projects/${this.projectData.id}/tasks.json`);
  }

  addCard(card: ComponentRef<CardComponent>){
    this.cards.push(card);
  }
}
