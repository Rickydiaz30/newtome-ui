import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './interceptors/auth.interceptor';
import { apiResponseInterceptor } from './interceptors/api-response.interceptor';
import { delayInterceptor } from './interceptors/delay.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),

    provideHttpClient(
      withInterceptors([
        authInterceptor,
        apiResponseInterceptor,
        delayInterceptor,
      ]),
    ),
  ],
};
