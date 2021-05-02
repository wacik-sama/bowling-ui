import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendService} from '../../../shared/service/backend.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  user: any;
  form: FormGroup;
  private username: FormControl;
  private name: FormControl;
  private surname: FormControl;
  constructor(private router: Router,
              private backendService: BackendService,
              private snackBar: MatSnackBar) {
    this.username = new FormControl();
    this.name = new FormControl();
    this.surname = new FormControl();
    this.form = new FormGroup({
      username: this.username,
      name: this.name,
      surname: this.surname,
    });
  }

  ngOnInit(): void {
    this.user = history.state.data;
    this.name.setValue(this.user.name);
    this.surname.setValue(this.user.surname);
    this.username.setValue(this.user.username);
  }

  logout(): void {
    this.router.navigate(['/']);
  }


  overview(): void {
    this.router.navigate(['/overview'], {state: {data: this.user}});
  }

  friendsOverview(): void {
    this.router.navigate(['/friends-overview'], {state: {data: this.user}});
  }

  save(): void {
    const user = {name : this.name.value, surname: this.surname.value, username: this.username.value};
    this.backendService.updateUser(this.user.id, user).subscribe(res => {
      console.log(res);
    });
  }
}
