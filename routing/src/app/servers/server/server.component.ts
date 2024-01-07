import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: Data) => this.server = data['server']
    );

    // const id = +this.activatedRoute.snapshot.params['serverId'];
    // this.server = this.serversService.getServer(id);
    // this.activatedRoute.params.subscribe(
    //   (params : Params)=>{
    //     this.server = this.serversService.getServer(+params['serverId']);
    //   }
    // );
  }

  public onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute, queryParamsHandling: 'preserve' });
  }

}
