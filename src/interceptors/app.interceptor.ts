import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    req = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });

    return next.handle(req);
  }
}
