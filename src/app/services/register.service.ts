import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_REGISTER_CLIENT, TOKEN_AUTH_SECRET} from '../services/auth.constant';
@Injectable()
export class RegisterService {
    static AUTH_TOKEN = '/oauth/token';
    static REGISTER_URL = '/api/user/register';

    constructor(private http: Http) { }

    register(model: any, token:any) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + token);

      
      return this.http.post(RegisterService.REGISTER_URL, model, {headers})
      .map(res => res.json())
      .map((res: any) => {
        return res;
      });
        
    }

    getRegisterToken() {
      const headers = new Headers();
      const body = `grant_type=client_credentials`;
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_REGISTER_CLIENT + ':' + TOKEN_AUTH_SECRET));

      
      return this.http.post(RegisterService.AUTH_TOKEN, body, {headers})
      .map(res => res.json())
      .map((res: any) => {

        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
    }


}
