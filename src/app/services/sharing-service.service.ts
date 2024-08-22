import { HttpClient, withFetch } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../../models/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SharingServiceService {
  public http: HttpClient = inject(HttpClient);
  public task$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public cardInfo$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public createCard$: Subject<void> = new Subject<void>();
  constructor(
    private cookieService: CookieService
  ) { }
  getUsers(): Observable<any>{
    return this.http.get<{[key: string]: User}>("https://todo-app-8ce90-default-rtdb.firebaseio.com/users.json");
  }
  getUserNick(){
    //get user nick
  }
  getProjects(){
    return this.http.get(`https://todo-app-8ce90-default-rtdb.firebaseio.com/users/${this.cookieService.get("user")}}/projects.json`);
  }
}
