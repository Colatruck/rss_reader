import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {Router,RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder,private loginService: LoginService,private router:Router) {}
  loginForm: FormGroup;


  submitForm(): void {
    if (this.loginForm.valid) {
      // 调用 LoginService 的 login 方法
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      const loginParams = {
        username,
        password
      }

      this.loginService.login(loginParams).subscribe(
        (res: string) => {
          // 处理成功的登录响应，假设令牌是一个字符串
          console.log("登录成功，令牌值为:",res['token']);
          // 存储令牌
          localStorage.setItem('itcast-token', res['token']);

          // 登录成功之后实现页面跳转
          this.router.navigate(['/list']).then(r => {});
        },
        (error) => {
          // 处理登录服务的错误
          console.error('登录失败', error);
        }
      );

    } else {
      // 表单无效，标记所有控件为脏状态以显示验证消息
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8)
      ]),
      password: new FormControl('', [
        Validators.minLength(6)
      ])
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

