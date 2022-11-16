import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { GlobalErrorHandler } from "./global-error-handler";
import { HttpErrorInterceptor } from "./http-error.interceptor";

@NgModule({
    declarations: [],
    imports: [CommonModule],

    //register classes for error interceptor
    providers: [
        {
            //process error
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            //interceptor for errors
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true //multiple interceptors are possible
        }
    ]
})

export class ErrorHandlerModule {}