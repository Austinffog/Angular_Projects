import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes : Routes = [
{ //canActivate: [AuthGuard] prevents users from going to the home page without signing in
    path : 'home', component : HomeComponent, canActivate: [AuthGuard]}, //home page
{ 
    path : 'signup', component : UserComponent, //path to sign up page
    children: [{ path: '', component : SignUpComponent}]
},
{ 
    path : 'login', component : UserComponent, //path to login page
    children: [{ path: '', component : SignInComponent}]
},
{ path : '', redirectTo : '/login', pathMatch : 'full'} //defualt route

];