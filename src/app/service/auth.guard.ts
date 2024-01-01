/*import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {
  const token = localStorage.getItem('itcast-token');
  const router = route.injector.get(Router); // 注入 Router

  if (!!token) {
    return true;
  } else {
    // 如果用户未经身份验证，则重定向到登录页
    return router.createUrlTree(['/login']);
  }
};*/
