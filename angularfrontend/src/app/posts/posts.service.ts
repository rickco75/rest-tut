import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Posts } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postUrl = '/api/contacts';

  getCurrentUrl() {
    if (window.location.href.includes('4200')) {
      this.postUrl = "http://localhost:8080/posts";
      console.log("Angular Application running on port: 4200");
    }
  }

  constructor(private http: Http, private httpClient: HttpClient) {
    this.getCurrentUrl();
  }

  posts: Posts[] = [];
  newPost: Posts = new Posts();

  // GET ("/posts")
  getPosts(): Promise<void | Posts[]> {
    return this.http.get(this.postUrl)
      .toPromise()
      .then(response => response.json() as Posts[])
      .catch(this.handleError);
  }

  createPost(newPost: Posts): Promise<void | Posts> {
    return this.http.post(this.postUrl, newPost)
               .toPromise()
               .then(response => response.json() as Posts)
               .catch(this.handleError);
  }

  addPost() {
    this.httpClient
      .post<Posts>(this.postUrl, this.newPost)
      .subscribe(result => this.getPosts());
  }

  // getPosts(){
  //   this.http
  //     .get<Post[]>(this.postUrl)
  //     .subscribe(result => (this.posts = result));
  //     //console.log(this.posts);
  // }


  // post("/posts")
  // createPost(newPost: Post): Promise<void | Post> {
  //   return this.http.post(this.postUrl, newPost)
  //     .toPromise()
  //     .then(response => response.json() as Post)
  //     .catch(this.handleError);
  // }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }


}
