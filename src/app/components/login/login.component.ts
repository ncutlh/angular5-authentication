import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    ngOnInit() {
        this.userService.logout();
    }

    login() {
        this.loading = true;
        
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            result => {
                this.loading = false;
                if (result) {
                    this.userService.login(result);
                    this.navigateAfterSuccess();
                } else {
                    this.alertService.error('Username or password is incorrect');
                }
            },
            error => {
                this.alertService.error("Username or password is incorrect");
                this.loading = false;
            });
    }

    private navigateAfterSuccess() {
        if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
        } else {
            this.router.navigate(['/']);
        }
    }
}
