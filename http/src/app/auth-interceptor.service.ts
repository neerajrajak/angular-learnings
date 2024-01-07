import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export class AuthInterceptorService implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        
        console.log('Request on its way..');
        console.log('Request Url : ', req.url);
        const modifiedRequest = req.clone({
            headers : req.headers.append('Auth','XYZ')
        });
        return next.handle(modifiedRequest);
    }
    
}