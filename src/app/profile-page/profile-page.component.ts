import { Component, OnInit } from '@angular/core';
import { LoginProfileService } from '../login-profile.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  name: any;
  email: any;
  username: any;
  id: any;
  pdata: any;
  hideShowProfileButton: any;
  constructor(
    private login: LoginProfileService,
    private route: Router,
    private http: HttpClient
  ) {}

  showProfile() {
    // if (this.login.pdata.data === null) {
    //   this.route.navigate(['/0/notfound']);
    // }
    this.name = this.login.pdata.name;
    this.username = this.login.pdata.username;
    this.email = this.login.pdata.email;
    this.id = this.login.pdata._id;
    this.hideShowProfileButton = true;
    // console.log(this.pdata.data);
  }

  updateProfile() {
    if (!(this.name && this.username && this.email))
      alert('Empty Field is not allowed');
    var req = {
      method: 'PUT',
      url: 'http://localhost:3400/profile/' + this.id,
      data: JSON.stringify({
        _id: this.id,
        name: this.name,
        username: this.username,
        email: this.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .put<any>(req.url, req.data, { headers: req.headers })
      .subscribe((res) => {
        console.log('Update', res);
        this.hideShowProfileButton = false;
        if (res) {
          this.showProfile();
          swal.fire({ icon: 'success', text: 'Your Profile is updated' });
        } else {
          swal.fire({ icon: 'warning', text: 'Profile not updated' });
        }
      });
  }

  deleteAccount() {
    swal
      .fire({
        icon: 'question',
        text: 'Your Account will be permanently deleted',
        confirmButtonColor: 'red',
        confirmButtonText: 'Delete',
        showCancelButton: true,
      })
      .then((res) => {
        if (res.value) {
          var req = {
            method: 'DELETE',
            url: 'http://localhost:3400/profile/' + this.id,
            data: JSON.stringify({
              _id: this.id,
              name: this.name,
              username: this.username,
              email: this.email,
            }),
          };
          this.http.delete(req.url).subscribe((res) => {
            if (res) this.route.navigate(['/signup']);
          });
        } else {
          console.log('not allowed to delete');
        }
      });
  }

  ngOnInit(): void {}
}
