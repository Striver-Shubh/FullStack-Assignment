import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginProfileService {
  pdata: any;
  token: any;
  constructor() {}

  getLoggedData(data: any) {
    this.pdata = data.data;
    this.token = data.token;
  }
}
