import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  constructor(private userService : UserService) {}
  public didActivate : boolean = false;
  public activatedSubscription : Subscription;
  ngOnInit() {
   this.activatedSubscription = this.userService.activatedEmmiter.subscribe(
      data => this.didActivate = data
    )
  }

  ngOnDestroy(){
    this.activatedSubscription.unsubscribe();
  }
}
