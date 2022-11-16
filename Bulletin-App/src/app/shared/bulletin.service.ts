import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import { Bulletin } from './bulletin.model';

@Injectable({
  providedIn: 'root'
})

export class BulletinService {

  selectedPost!: Bulletin; //bulletin model class
  post!: Bulletin[]; //save posts in an array
  readonly baseURL = "http://localhost:3000/bulletin";

  constructor(private http : HttpClient) { }

  postBulletin(bull : Bulletin){
    return this.http.post(this.baseURL, bull);

  }

  //return posts to be displayed
  getPost(){
    return this.http.get(this.baseURL);
  }

  deletePost(post: string) {
    return this.http.delete(this.baseURL + `/${post}`);
  }
}
