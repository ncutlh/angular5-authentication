import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from '../../services/register.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;

  ngOnInit() {}
  constructor(private router: Router,
      private registerService: RegisterService,
      private alertService: AlertService) { }

  register() {
      this.loading = true;
      this.registerService.getRegisterToken()
      .subscribe(
        result => {

          this.loading = false;
            if (result) {
              this.registerService.register(this.model,result).subscribe(
                result2 => {
                  if(result2) {
                    this.alertService.success('Successfully registered! You can login now.',true);
                    this.router.navigate(['/login']);
                  } else {
                    this.alertService.error('An error occured');
                  }
                },
                error2 => {
                    if(error2.status == 500){
                      this.alertService.error("Username or email already exists");
                    }
                    
                });
            } 
        },
        error => {
            this.alertService.error(error);

            this.loading = false;
        });
        
  }



}
