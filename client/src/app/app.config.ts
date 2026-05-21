import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { InitService } from '../core/services/init-service';
import { lastValueFrom } from 'rxjs';
import { resolve } from 'node:path';
import { error } from 'node:console';
import { errorInterceptor } from '../core/services/error-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideRouter(routes, withViewTransitions()),

    provideHttpClient(withInterceptors([errorInterceptor])),

    provideAppInitializer(() => {
      const initService = inject(InitService);

      return new Promise<void>((resolve) => {

        setTimeout(async () => {

          try {
            await lastValueFrom(initService.init());

          } finally {

            const splash = document.getElementById('initial-splash');

            if (splash) {
              splash.remove();
            }

            resolve();
          }

        }, 500);

      });
    })
  ]
};