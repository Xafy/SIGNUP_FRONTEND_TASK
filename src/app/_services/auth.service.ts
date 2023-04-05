import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(firstName: string, lastName: string, phoneNumber:string,  email: string, password: string, agreement: boolean, verifyBy: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        agreement,
        verifyBy
      },
      httpOptions
    );
  }

  socialSignup(firstName: string, lastName: string, email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'social',
      {
        firstName,
        lastName,
        email,
      }
    );
  }

}
