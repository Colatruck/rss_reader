import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface RegisterForm{
  username:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  register(registerForm:RegisterForm){
    return this.http.post('https://shiny-waffle-74www79qgj42r6jj-9000.app.github.dev/auth/register',registerForm)
  }
}
