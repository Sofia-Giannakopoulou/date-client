import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { errorInterceptor } from './interceptor/error.interceptor';
import { jwtInterceptor } from './interceptor/jwt.interceptor';
import { loadingInterceptor } from './interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])
    ),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
    }),
    importProvidersFrom(
      NgxSpinnerModule,
      TimeagoModule.forRoot(),
      ModalModule.forRoot()
    ),
  ],
};
