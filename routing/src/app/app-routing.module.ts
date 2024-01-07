import { NgModule } from "@angular/core";

import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGaurd } from "./auth-gaurd.service";
import { CanDeactivateGaurd } from "./servers/edit-server/can-deactivate-gaurd.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':userId/:userName', component: UserComponent }
    ]
  },
  {
    path: 'servers',
    // canActivate :[AuthGaurd] ,
    canActivateChild: [AuthGaurd],
    component: ServersComponent,
    children: [
      { path: ':serverId', component: ServerComponent, resolve : {server : ServerResolver} },
      { path: ':serverId/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGaurd] }
    ]
  },
  { path: 'not-found', component: ErrorPageComponent, data : {message : 'Incorrect Url'} },
  //{ path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash : true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}