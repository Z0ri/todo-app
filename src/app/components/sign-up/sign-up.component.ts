import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, withFetch } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../../models/User';


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
    private dataService: DataService
  ){}
  http: HttpClient = inject(HttpClient);
  onSignup(form: NgForm){
    this.http.post<{name: string}>("https://todo-app-8ce90-default-rtdb.firebaseio.com/users.json", 
      JSON.parse(JSON.stringify(form.value)))
      .subscribe((response)=>{
        let newUser = new User(form.value.username, form.value.email, form.value.password, response.name);
        console.log("new user id: ", newUser.id);
        this.dataService.allUsers.push(newUser);
        this.router.navigate(['/login']); 
      });

  }
}