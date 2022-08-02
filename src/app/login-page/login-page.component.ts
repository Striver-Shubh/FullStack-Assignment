import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { LoginProfileService } from '../login-profile.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: String;
  password: String;
  DataToBeValidated: any;
  ProfileData: any;
  constructor(
    private http: HttpClient,
    private route: Router,
    private loginService: LoginProfileService
  ) {
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
        this.ProfileData = res.user;
        this.loginService.getLoggedData({
          data: this.ProfileData,
          token: res.locals.token,
        });
        if (res.bool) {
          console.log(res);
          swal.fire({
            title: 'Submit',
            text: 'Logged In Successfully',
            icon: 'success',
          });
          this.route.navigate(['/profile', res.token]);
        } else {
          // res.render('Invalid Credentials');
          swal.fire({
            title: 'Try Again',
            text: 'Invalid Credentials',
            icon: 'error',
          });
          console.log('Invalid');
        }
      });
  }
  ngOnInit(): void {}
}
