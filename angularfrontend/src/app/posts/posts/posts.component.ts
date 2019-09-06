import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {

  posts: Post[];
  
  constructor(private postService: PostsService) { }

  ngOnInit() {

    this.postService
    .getContacts()
    .then((posts: Post[]) => {
      this.posts = posts.map((post) => {
        return post;
      });
    });
  }

}
