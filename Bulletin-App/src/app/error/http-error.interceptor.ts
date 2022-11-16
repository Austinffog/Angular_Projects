import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorDialogService } from "../shared/error/error-dialog.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor{
    constructor(
        private errorDialogService: ErrorDialogService
        
        ){}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>>{

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) =>{
                console.error("Error from error interceptor", error);

                //show dialog
                this.errorDialogService.openDialog(error.message ?? JSON.stringify(error), error.status);
                return throwError(error);
            }),

        ) as Observable<HttpEvent<any>>;
    }
}
