import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from './toast-service';
import { Router } from 'express';
import { inject } from '@angular/core';
import { NavigationExtras } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors){
              const modelstateErrors = [];
              for (const key in error.error.errors) {

                if (error.error.errors[key]){
                  modelstateErrors.push(error.error.errors[key])
                }
                throw modelstateErrors.flat()
              }
            } else{
              toast.error(error.error)
            }
            break;
          case 401:
            toast.error('Unauthhorized');
            break;
          case 404:
           router.navigatByUrl('/not-found')
            break;
          case 500:
           const navigationExtras: NavigationExtras = {state: {error: error.error}}
           router.navigatByUrl('/server-error', navigationExtras)
            break;
          default:
            toast.error('Something went wrong');
            break;
        }
      }
throw error;
    })


  );
};
