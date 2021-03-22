import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor() {
    this.username = new FormControl();
    this.password = new FormControl();
    this.form = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

}
