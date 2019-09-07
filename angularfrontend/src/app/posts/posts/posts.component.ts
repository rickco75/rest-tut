import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Posts } from '../post';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from "@angular/router"
import { Location } from '@angular/common';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {

  private postUrl = '/api/posts';
  posts: Posts[];
  newPost: Posts = new Posts();
  updatedPost: Posts = new Posts();



  constructor(private postService: PostsService, 
              private httpClient: HttpClient, 
              private http: Http, private router: Router,
              private location: Location) {

    this.getCurrentUrl();
  }

  getCurrentUrl() {
    if (window.location.href.includes('4200')) {
      this.postUrl = "http://localhost:8080/posts";
      //console.log("Angular Application running on port: 4200");
    }
  }

  getPosts() {
    this.httpClient
      .get<Posts[]>(this.postUrl)
      .subscribe(result => (this.posts = result));
    console.log(this.posts);
  }

  addPost() {
    this.httpClient
      .post<Posts>(this.postUrl, this.newPost)
      .subscribe(result => this.getPosts());

  }

  deletePost(id) {
    if (confirm('Are you sure? This operation cannot be undone.')){      
      this.http
        .delete(this.postUrl + "/" + id)
        .subscribe(result => this.getPosts());
    }
  }

  updatePost(id) {
    if (confirm('Are you sure? ')){      
      this.http
        .patch(this.postUrl + "/" + id,this.updatedPost)
        .subscribe(result => this.getPosts());
    }
  }  

  backClicked(){
    this.location.back();
  }

  ngOnInit() {

    this.postService
      .getPosts()
      .then((posts: Posts[]) => {
        this.posts = posts.map((post) => {
          return post;
        });
      });
  }

}
