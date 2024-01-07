import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export class LoginInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Outgoing Logging');
        console.log('from login req', req.headers);
        return next.handle(req)
        .pipe(
            tap(
                event =>{
                    if(event.type === HttpEventType.Response){
                        console.log('Response from Login Interceptor : ',event.body);
                    }
                }
            )
        );
    }
}