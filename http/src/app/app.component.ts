import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  loadedPosts = [];
  isFetching = false;
  errorMessage = null;
  private errorSub: Subscription;
  constructor(private http: HttpClient, private postService: PostService) { }

  ngOnInit() {

    this.errorSub = this.postService.errorTrigger.subscribe(
      err => this.errorMessage = err
    )
    this.getAllPosts();
  }

  private getAllPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log('Data Retrievd : ', posts);
    }, error => {
      console.log('Error : ', error.error.error);
      this.isFetching = false;
      this.errorMessage = error.error.error;
    }
    );
  }

  onCreatePost(postData: { title: string; content: string }) {
    //console.log('Data to post : ',postData);
    this.postService.createAndStorePost(postData);
    this.loadedPosts.push(postData);
  }

  onFetchPosts() {
    this.getAllPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(
      () => this.loadedPosts = []
    );
  }

  onHandleError(){
    this.errorMessage = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
