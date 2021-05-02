import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {BackendService} from '../../../shared/service/backend.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  private username: FormControl;
  private password: FormControl;
  private name: FormControl;
  private surname: FormControl;
  private email: FormControl;

  constructor(public dialogRef: MatDialogRef<RegistrationComponent>,
              private backendService: BackendService,
              private snackBar: MatSnackBar) {
    this.username = new FormControl();
    this.password = new FormControl();
    this.name = new FormControl();
    this.surname = new FormControl();
    this.email = new FormControl();
    this.form = new FormGroup({
      username: this.username,
      password: this.password,
      name: this.name,
      surname: this.surname,
      email: this.email
    });
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    // tslint:disable-next-line:max-line-length
    const user = {name: this.name.value, surname: this.surname.value, email: this.email.value, password: this.password.value, username: this.username.value};
    this.backendService.registerUser(user).subscribe(res => {
      this.snackBar.open('User has been created', '', {
        duration: 2000,
      });
      this.dialogRef.close();
    }, error => {
      this.snackBar.open('User with this email already exists', '', {
        duration: 2000,
      });
    });
  }
}
