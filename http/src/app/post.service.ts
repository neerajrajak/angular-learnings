import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PostService {

    constructor(private http: HttpClient) {

    }

    errorTrigger = new Subject<string>();
    

    createAndStorePost(postRequest: Post) {
        // Send Http request
        this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-6524f.firebaseio.com/posts.json',
                postRequest,
                {
                    observe : 'response'
                }
            )
            .subscribe(responseData => {
                console.log('Data Posted : ', responseData);
            },
            err => this.errorTrigger.next(err.message));
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty'); //query param Supported by firebase
        searchParams = searchParams.append('custom','key'); //appending custom query param
        //get logic here
        return this.http
            .get<{ [key: string]: Post }>(
                'https://ng-complete-guide-6524f.firebaseio.com/posts.json',
                {
                    headers : new HttpHeaders({
                        'Custom-Header' : 'Hello'
                    }),
                    params : searchParams,
                    responseType : 'json'
                }
                )
            .pipe(
                map(
                    responseData => {
                        const postArray: Post[] = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                postArray.push({ ...responseData[key], id: key })
                            }
                        }
                        return postArray;
                    }
                ),
                catchError(
                    errorResponse =>  {
                        return throwError(errorResponse)
                    }
                )
            )

    }

    deletePosts() {
        return this.http
        .delete(
            'https://ng-complete-guide-6524f.firebaseio.com/posts.json',
            {
                observe : 'events',
                responseType : 'text'
            }
            )
        .pipe(tap(
            event => {
                console.log(event);
                if(event.type === HttpEventType.Response ){
                    console.log('On Clear Response Event', event.body)
                }
                if(event.type === HttpEventType.Sent){
                    //handle like request sent waiting for response
                }
            }
        ));
    }
}