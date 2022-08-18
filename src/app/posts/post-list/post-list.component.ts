import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostService } from "../posts.service";

@Component({
  selector:     "app-post-list",
  templateUrl:  "./post-list.component.html",
  styleUrls:   ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  private postSub: Subscription;

  /* SAMPLE SET
  posts = [
    {
      title:    "First Post",
      content:  "This is the first post's content."
    },
    {
      title:    "Second Post",
      content:  "This is the second post's content."
    },
    {
      title:    "Third Post",
      content:  "This is the third post's content."
    }
  ];
  */

  constructor(public postService: PostService){}

  // Fetching all posts; must implement OnInit method
  ngOnInit(): void {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {this.posts = posts;}
    );
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
