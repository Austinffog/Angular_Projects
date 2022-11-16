import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { BulletinService } from '../shared/bulletin.service';
import { Bulletin } from '../shared/bulletin.model';

declare var M : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BulletinService]
})
export class HomeComponent implements OnInit {

  constructor(private router : Router, public bulletinService: BulletinService) { }

  ngOnInit(): void {
    this.resetForm();
    this.BulletinList();
  }

  Logout(){ //logout back to login page
    this.router.navigate(['/login']);
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.bulletinService.selectedPost = {
      post: ""
    }
  }

  //save the post from the form
  onSubmit(form : NgForm){
    this.bulletinService.postBulletin(form.value).subscribe((res) =>{
      this.resetForm();
      M.toast({html: 'Saved successfully', classes: 'rounded'});
    });
  }

  //posts made to the bulletin board
  BulletinList(){
    this.bulletinService.getPost().subscribe((res) => {
      this.bulletinService.post = res as Bulletin[];
    });
  }

  //delete post from list
  onDelete(post: string, form: NgForm){
    if (confirm('Are you sure you want to delete this post?') == true) {
      this.bulletinService.deletePost(post).subscribe((res) => {
        this.BulletinList();
        this.resetForm(form);
        M.toast({html: 'Deleted successfully', classes: 'rounded'});
      });
    }
  }


}
