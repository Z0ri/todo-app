import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterOutlet,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
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
  onStartClick(){
    if(this.cookieService.get("user")){
      this.router.navigate(["/desk"]);
    }else{
      this.router.navigate(["/sign-up"]);
    }
  }
  onRouteChange() {
    if(this.cookieService.get("user")){
      this.isLogged = true;
    }
  }
}
