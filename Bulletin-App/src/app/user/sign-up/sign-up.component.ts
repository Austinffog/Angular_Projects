import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})

export class SignUpComponent implements OnInit {
  user!: User; //user property
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  showSuccessMessage!: boolean; 
  serverErrorMessage!: string;
  csrfToken!: string;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){ //will reset the form
    if(form != null) //only call if fields are not null
    form.reset();
    this.user = {
      JobRole: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  //save the details of the sign up form to database
  onSubmit(form? : NgForm){
    this.userService.postUser(form?.value).subscribe(
    res => { this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 4000); },
    error => {
      if (error.status == 422){
        this.serverErrorMessage = error.error.join('<br/>');
      }
      else
      this.serverErrorMessage = 'Something went wrong. Please contact admin';
    }
    );
  }

}
