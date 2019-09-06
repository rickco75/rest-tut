import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from './post';

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

  constructor(private http: Http) {
    this.getCurrentUrl();
  }

  getContacts(): Promise<void | Post[]> {
    return this.http.get(this.postUrl)
      .toPromise()
      .then(response => response.json() as Post[])
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }


}
