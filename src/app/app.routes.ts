import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { DeskComponent } from './components/desk/desk.component';
import { ProjectComponent } from './components/project/project.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'project', component: ProjectComponent},
    {path: 'desk', component: DeskComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'contacts', component: ContactsComponent}
];
