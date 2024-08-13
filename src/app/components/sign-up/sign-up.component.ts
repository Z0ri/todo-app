import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, NgForm} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private router: Router){}
  http: HttpClient = inject(HttpClient);
  onSignup(form: NgForm){
    this.http.post<{name: string}>("https://todo-app-8ce90-default-rtdb.firebaseio.com/users.json", 
      JSON.parse(JSON.stringify(form.value)))
      .subscribe((response)=>{
        console.log("server response: ", response);
      });
    this.router.navigate(['/login']); 
  }
}
