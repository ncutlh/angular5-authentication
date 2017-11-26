import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';;

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './components/alert/alert.component';

import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';

import {TOKEN_NAME} from './services/auth.constant';
import {AppDataService} from './services/app.data.service';
import { AdminAuthGuard } from './guards/admin.auth.guard';
import { RegisterService } from './services/register.service';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthGuard,
    AdminAuthGuard,
    AuthenticationService,
    UserService,
    RegisterService,
    AppDataService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
