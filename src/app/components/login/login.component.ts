import { Component, inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchAllUsers();
    console.log(this.allUsers);
  }
  allUsers: User[] = [];
  http: HttpClient = inject(HttpClient);
  onLogin(form: NgForm){
    let email = form.value.email;
    let password = form.value.password;

    for(let user of this.allUsers){
      if(user.email == email && user.password == password){
        //LOG IN SUCCESS
        this.router.navigate(['/']);   
        localStorage.setItem("user", "true");
      }
    }
  }
  fetchAllUsers(){
    this.http.get<{[key: string]: User}>("https://todo-app-8ce90-default-rtdb.firebaseio.com/users.json")
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
