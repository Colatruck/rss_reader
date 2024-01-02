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
    return this.http.post('https://service-pd66a0kt-1318426046.cd.tencentapigw.com/release/auth/register',registerForm)
  }
}
