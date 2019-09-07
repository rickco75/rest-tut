import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Posts } from '../post';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  public model: any;
  updatedPost: Posts = new Posts();
  public id: string;

  private postUrl = '/api/posts';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  getPosts() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id: ' + this.id);
    this.http
      .get(this.postUrl + '/' + this.id)
      .subscribe(post => (this.model = post));
  }

  onSubmit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id: " + this.id);
    this.http
      .patch(this.postUrl + '/' + this.id, this.model)
      .toPromise()
      .then(() => this.router.navigate(['/posts']));
  }

  backClicked(){
    this.location.back();
  }


  getCurrentUrl() {
    if (window.location.href.includes('4200')) {
      this.postUrl = "http://localhost:8080/posts";
      //console.log("Angular Application running on port: 4200");
    }
  }

  ngOnInit() {
    this.getCurrentUrl();
    this.getPosts();
  }

}
