import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('itcast-token');
  // 如果token有值，表示登录成功，继续跳转，否则跳转到首页
  if (token) {
    console.log("登陆成功");
    return true;
  }
  console.log("登陆失败");
  router.navigate(['/login']).then(r => {});
  return false;
};

