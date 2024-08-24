import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, withFetch } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private router: Router,
    private cookieService: CookieService
  ){}
  http: HttpClient = inject(HttpClient);
  onSignup(form: NgForm){
    this.http.post<{name: string}>("https://todo-app-8ce90-default-rtdb.firebaseio.com/users.json", 
      JSON.parse(JSON.stringify(form.value)))
      .subscribe((response)=>{
        this.cookieService.set("user", response.name);
      });
    this.router.navigate(['/login']); 
  }
}