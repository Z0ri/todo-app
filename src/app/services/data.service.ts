import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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
  constructor(private cookieService: CookieService){}
}
