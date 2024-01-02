import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface LoginForm{
  username:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(loginForm:LoginForm){
    return this.http.post('https://service-pd66a0kt-1318426046.cd.tencentapigw.com/release/auth/login',loginForm)
  }
}
