import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class BackEndService {

  constructor(private http: Http, private router: Router) { }

  CLIENT_ID = 'devglan-client';
  CLIENT_SECRET = 'devglan-secret';

  url: string;
  headers: Headers;
  options: RequestOptions;
  creds: String;
  updatedUser: string;

  authenticate(user: User) {
    this.url = 'http://localhost:8080/oauth/token';
    this.headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Authorization': 'Basic ZGV2Z2xhbi1jbGllbnQ6ZGV2Z2xhbi1zZWNyZXQ'
      'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.creds = 'grant_type=password&username=' + user.username + '&password=' + user.password;
    this.http.post(this.url, this.creds, this.options)
      .map(res => res.json()).subscribe(response => {
        console.log(localStorage)
        localStorage.setItem('currentUser', JSON.stringify({ userName: user.username, token: response }));
        this.router.navigateByUrl('/home');
      }, (error) => {
        console.log('error in', error);
      });
  }

  getUpdatedUser(user: User): Observable<User> {
    this.url = 'http://localhost:8080/users/1';
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token.access_token
    });
    this.options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.url, this.options)
      .map(res => res.json());
  }
}
