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
    return this.http.post('https://shiny-waffle-74www79qgj42r6jj-9000.app.github.dev/auth/login',loginForm)
  }
}
