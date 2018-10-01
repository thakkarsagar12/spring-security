import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { User } from '../../model/user';
import { BackEndService } from '../../services/backend.service';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  user: User;

  constructor(private http: Http, private router: Router, private backEndService: BackEndService) {}

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.user = new User('', '');

  } onSubmit() {
    this.backEndService.authenticate(this.user);
  }
  
}

