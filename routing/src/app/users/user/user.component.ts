import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubcription: Subscription;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.activatedRoute.snapshot.params['userId'],
      name: this.activatedRoute.snapshot.params['userName'],
    }

    //In our template we have a component calling itself(Load Ana anchor tag) when calling a route,
    //in such cases if we dnt use below code snippet, then only url changes and the content is not 
    //rendered accurately
    this.paramsSubcription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['userId'];
        this.user.name = params['userName'];
      }
    );
  }

  ngOnDestroy() {
    //alert('Check Destroy');
    this.paramsSubcription.unsubscribe();
  }

}
