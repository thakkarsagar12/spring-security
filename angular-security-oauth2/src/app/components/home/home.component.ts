import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { User } from '../../model/user';
import { BackEndService } from '../../services/backend.service';

@Component({
  selector: 'home-app',
  templateUrl: './home.component.html'
})

export class HomeComponent  {

  @Input('loggedInUser') loggedInUser: string;
  getUrl = 'http://localhost:9090/getUpdatedUser';
  user = new User(JSON.parse(localStorage.getItem('currentUser'))
                          .userName, '');

  constructor(private http: Http, private router: Router, private backEndService: BackEndService) {}

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }

  getUpdatedUser(): void{
    this.backEndService.getUpdatedUser(this.user).subscribe(response => {
      this.loggedInUser = response.username;
    }, (error) => {
      console.log('error in', error);
    });
  }
}

