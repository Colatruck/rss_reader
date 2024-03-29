import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// export const loginGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const token = localStorage.getItem('itcast-token');
//   // 如果token有值，表示登录成功，继续跳转，否则跳转到首页

//   if (token) {
//     console.log("登陆成功");
//     return true;
//   }
//   console.log("登陆失败");
//   router.navigate(['/login']).then(r => {});
//   return false;
// };

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const token = localStorage.getItem('itcast-token');

  if (!token) {
    console.log("登陆失败");
    router.navigate(['/login']);
    return false;
  }

  // 将验证逻辑转换为返回Observable<boolean>
  return http.post<any>('https://service-pd66a0kt-1318426046.cd.tencentapigw.com/release/auth/verify', { token }).pipe(
    map(response => {
      console.log("登陆成功");
      console.log(response)
      return true; // 如果验证成功，允许路由导航
    }),
    catchError(error => {
      console.log("登陆失败");
      console.log(error)
      router.navigate(['/login']);
      return of(false); // 如果验证失败，重定向到登录页面
    })
  );
};
