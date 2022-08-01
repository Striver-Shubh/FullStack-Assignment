import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: String;
  password: String;
  DataToBeValidated: any;
  constructor(private http: HttpClient, private route: Router) {
    this.username = '';
    this.password = '';
    this.DataToBeValidated = [];
  }
  submit() {
    this.DataToBeValidated.push({
      username: this.username,
      password: this.password,
    });
    console.log(this.DataToBeValidated);
    var req = {
      method: 'POST',
      url: 'http://localhost:3400/login',
      data: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<any>(req.url, req.data, { headers: req.headers })
      .subscribe((res) => {
        console.log(res);
      });
    this.route.navigate(['/profile']);
  }
  ngOnInit(): void {}
}
