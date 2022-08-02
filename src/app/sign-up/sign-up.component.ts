import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  GroupData: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router
  ) {
    this.GroupData = [];
  }
  Signupform = this.fb.group(
    {
      name: ['', Validators.required, Validators.minLength(3)],
      email: ['', Validators.required, Validators.email],
      username: ['', Validators.required, Validators.minLength(3)],
      password: ['', Validators.required, Validators.minLength(6)],
    },
    { updateOn: 'submit' }
  );

  submit() {
    this.GroupData.push(this.Signupform);
    console.log(this.GroupData);
    var req = {
      method: 'POST',
      url: 'http://localhost:3400/signup',
      data: JSON.stringify(this.Signupform.value),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.http
      .post<any>(req.url, req.data, { headers: req.headers })
      .subscribe((res) => {
        console.log(res);
      });
    this.route.navigate(['/login']);
  }
  ngOnInit(): void {}
}
