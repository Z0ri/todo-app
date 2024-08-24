import { Component, inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';

import { HttpClient, withFetch } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../../../models/User';
import { Router, RouterModule } from '@angular/router';
import { SharingServiceService } from '../../services/sharing-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private sharingService: SharingServiceService 
  ){}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  allUsers: User[] = [];
  http: HttpClient = inject(HttpClient);
  onLogin(form: NgForm){
    let usernameOrEmail = form.value.usernameOrEmail;
    let password = form.value.password;
    console.log(usernameOrEmail);
    console.log(password);
    for(let user of this.allUsers){
      console.log(user.email);
      console.log(user.password);
      if(user.email == usernameOrEmail || user.username == usernameOrEmail && user.password == password){
        //LOG IN SUCCESS
        this.router.navigate(['/']);   
        this.cookieService.set('user', user.id);
      }
    }
  }
  
  fetchAllUsers(){
    this.sharingService.getUsers()
    .pipe(map((response) => {
      let users = [];
      for(let key in response){
        if(response.hasOwnProperty(key)){
          users.push({...response[key], id: key})
        }
      }
      return users;
    }))
    .subscribe((users) => {
      this.allUsers = users;
    })
  }
}