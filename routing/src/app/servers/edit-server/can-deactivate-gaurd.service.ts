import { Observable } from "rxjs/observable";

import {CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router'


export interface CanComponentDeactivate{
    canDeactivate : () => Observable<boolean> | Promise<boolean> | boolean
}

export class CanDeactivateGaurd implements CanDeactivate<CanComponentDeactivate>{

    canDeactivate(component : CanComponentDeactivate,
        currentRoute : ActivatedRouteSnapshot,
        currentState : RouterStateSnapshot,
        nextState ?: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
            return component.canDeactivate();
        }

}