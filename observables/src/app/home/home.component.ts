import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscription : Subscription;
  constructor() { }

  ngOnInit() {

   //this.firstSubscription = interval(1000).subscribe(count => console.log(count));
   const customIntervalObservable = Observable.create(
    observer =>{
      let count = 0;
      setInterval( ()=>{
        observer.next(count);
        if(count === 5){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('greater than 3'));
        }
        count++;
      }, 1000)
    }
  )

   
  
  // this.firstSubscription = customIntervalObservable.subscribe(
  //   data =>  console.log(data) ,
  //   error => console.log(error.message),
  //   ()=> console.log('COMPLETED !')
  // )

  //using operator
  this.firstSubscription = customIntervalObservable.pipe(
    filter(
      data => data > 0
    )
    ,map(
    (data : number) => {
      return 'Round : '+(data + 1)
    }
  ))
  .subscribe(
    data =>  console.log(data) ,
    error => console.log(error.message),
    ()=> console.log('COMPLETED !')
  )
  }

  ngOnDestroy(){
    this.firstSubscription.unsubscribe();
    
  }

}
