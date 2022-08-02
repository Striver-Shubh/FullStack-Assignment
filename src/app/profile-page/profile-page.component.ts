import { Component, OnInit } from '@angular/core';
import { LoginProfileService } from '../login-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  pdata: any;
  constructor(private login: LoginProfileService, private route: Router) {}

  showProfile() {
    if (this.login.pdata.data === null) {
      this.route.navigate(['/0/notfound']);
    }
    this.pdata = JSON.stringify(this.login.pdata.data);
    console.log(this.pdata.data);
  }

  ngOnInit(): void {}
}
