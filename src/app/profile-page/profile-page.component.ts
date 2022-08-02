import { Component, OnInit } from '@angular/core';
import { LoginProfileService } from '../login-profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  pdata: any;
  constructor(private login: LoginProfileService) {}

  showProfile() {
    this.pdata = JSON.stringify(this.login.pdata);
    console.log(this.pdata);
  }

  ngOnInit(): void {}
}
