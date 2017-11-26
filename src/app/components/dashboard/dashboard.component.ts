import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    loading = false;

    constructor(private router: Router, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.loading = true;
        //this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
        this.loading = false;
    }

    private loadAllUsers() {
        this.loading = true;
       // this.userService.getAll().subscribe(users => { this.users = users; });
        this.loading = false;
    }

}
