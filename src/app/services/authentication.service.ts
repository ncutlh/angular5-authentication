import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {TOKEN_AUTH_CLIENT_ID, TOKEN_AUTH_SECRET} from '../services/auth.constant';
@Injectable()
export class AuthenticationService {
    static AUTH_TOKEN = '/oauth/token';

    constructor(private http: Http) { }

    login(username: string, password: string) {
        const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_CLIENT_ID + ':' + TOKEN_AUTH_SECRET));

        return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
        .map(res => res.json())
        .map((res: any) => {
          if (res.access_token) {
            return res.access_token;
          }
          return null;
        });
    }


}
