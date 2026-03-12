import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs/operators';

export const delayInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(delay(800));

  return next(req).pipe(delay(750));
};
