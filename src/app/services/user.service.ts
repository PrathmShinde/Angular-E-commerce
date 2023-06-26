import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((res) => {
        this.isUserLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(res.body));
        this.router.navigate(['/']);
      });
  }

  userLogin(data:login){
    this.http.get<login[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe : 'response'}).subscribe(result =>{
      if(result && result.body?.length){
        this.inValidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      } else{
        this.inValidUserAuth.emit(true);
      }
    })
  }
  
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
