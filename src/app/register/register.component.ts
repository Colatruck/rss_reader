import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {Router,} from "@angular/router";
import {NgIf} from "@angular/common";
import {RegisterService} from "../service/register.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private fb: FormBuilder,private registerService: RegisterService,private router:Router) {}
  registerForm: FormGroup;


  submitForm(): void {
    if (this.registerForm.valid) {

      const username = this.registerForm.get('username').value;
      const password = this.registerForm.get('password').value;

      const registerParams = {
        username,
        password
      }

      this.registerService.register(registerParams).subscribe(
        (res) => {
          // 如果后端返回的是 true，则表示注册成功
          if (res === true) {
            console.log('注册成功');
            // 注册成功之后实现页面跳转
            this.router.navigate(['/login']).then(r => {});
          } else if (typeof res === 'string') {
            console.log('用户已存在')
            // 如果后端返回的是字符串，则表示注册失败，输出错误信息
            console.error('注册失败', res);
          }
        },
        (error) => {
          // 处理注册服务的错误
          console.error('注册失败', error);
        }
      );
    } else {
      // 表单无效，标记所有控件为脏状态以显示验证消息
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
