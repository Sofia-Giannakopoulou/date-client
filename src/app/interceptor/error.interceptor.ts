import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error?.errors) {
              // Safely extract validation errors as string[]
              const modalStateErrors: string[] = Object.values(
                error.error.errors
              ).flat() as string[];
              throw modalStateErrors;
            } else if (typeof error.error === 'string') {
              toastr.error(error.error, error.status.toString());
            } else {
              toastr.error('Bad Request', error.status.toString());
            }
            break;
          case 401:
            toastr.error('Unauthorized', error.status.toString());
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error(
              'Something unexpected went wrong',
              error.status.toString()
            );
            console.error('Unexpected error:', error);
            break;
        }
      }

      return throwError(() => error); // Re-throw the error
    })
  );
};
