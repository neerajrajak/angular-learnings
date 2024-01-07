import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-gaurd.service';
import { Observable } from 'rxjs/observable';
@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log('Query Param : ', this.activatedRoute.snapshot.queryParams);
    console.log('Fragments : ', this.activatedRoute.snapshot.fragment);
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => { this.allowEdit = queryParams['allowEdit'] === '1' ? true : false }
    );
    this.activatedRoute.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      confirm('Are you sure you want to discard changes?');
      return false;
    }
    else {
      return true;
    }
  }

}
