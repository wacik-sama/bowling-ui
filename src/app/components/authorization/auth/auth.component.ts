import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendService} from '../../../shared/service/backend.service';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationComponent} from '../registration/registration.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private backendService: BackendService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.username = new FormControl();
    this.password = new FormControl();
    this.form = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.backendService.login({email: this.username.value, password: this.password.value}).subscribe((res) => {
      console.log(res);
      const user = {id: res.id, username: res.username, email: res.email, name: res.name, surname: res.surname};
      this.snackBar.open('User logged in', '', {
        duration: 2000,
      });
      this.router.navigate(['/overview'], {state: {data: user}});

    }, () => {
      this.snackBar.open('Wrong email or password', '', {
        duration: 2000,
      });
    });
  }

  openDialog(): void {
    this.dialog.open(RegistrationComponent, {
      width: '250px',
      height: '440px'
    });
  }
}
