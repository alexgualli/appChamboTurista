import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ServiceService{

  constructor(private http:HttpClient) {
    super('/user');
   }

   createUser(user){  
     console.log(this.http.post(this.url,user));  
    return this.http.post(this.url,user);
   }

   login({ email, pass }: { email: string; pass: string; }){
     return this.http.put(this.url,{email,pass});
   }
}
