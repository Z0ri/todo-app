import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatMenuModule } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'todo-app';
  isLogged: boolean = false;
  
  constructor(
    private router: Router,
    private cookieService: CookieService
  ){}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(()=>{
      this.onRouteChange();
    });
  }
  
  onRouteChange() {
    if(this.cookieService.get("user")){
      this.isLogged = true;
    }
  }

  onLogout(){
    this.cookieService.delete("user");
    window.location.reload();
  }
}
