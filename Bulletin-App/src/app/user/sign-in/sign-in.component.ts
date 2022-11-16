import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router : Router) { }

  model = {
    JobRole : '',
    password : ''
  };

  serverErrorMessages!: string;
  ngOnInit(): void {
    if (this.userService.isLoggedIn())
    this.router.navigateByUrl('/home');
  }

  //save the signin information with a json webtoken
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('./home');

      },
      error =>{
        this.serverErrorMessages = error.error.message;
      }
    )
  }

}

