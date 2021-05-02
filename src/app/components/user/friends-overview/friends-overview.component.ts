import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from '../../../shared/service/backend.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ProfileInspectionComponent} from '../../profile-inspection/profile-inspection.component';

@Component({
  selector: 'app-friends-overview',
  templateUrl: './friends-overview.component.html',
  styleUrls: ['./friends-overview.component.css']
})
export class FriendsOverviewComponent implements OnInit {
  user: any;
  userList: any = [];
  friend: FormControl;
  form: FormGroup;

  constructor(private router: Router,
              public backendService: BackendService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.friend = new FormControl();
    this.form = new FormGroup({
      friend: this.friend
    });
  }

  ngOnInit(): void {
    this.user = history.state.data;
    this.userList = history.state.users;
    this.backendService.getUserFriends(this.user.id).subscribe(res => {
      if (res[0] == null) {
        this.backendService.friendList = [];
      } else {
        this.backendService.friendList = res;
      }
    });
  }

  logout(): void {
    this.router.navigate(['/']);
  }

  profileDetails(): void {
    this.router.navigate(['/profile-details'], {state: {data: this.user}});
  }

  overview(): void {
    this.router.navigate(['/overview'], {state: {data: this.user}});
  }

  deleteFriend(id: number): void {
    this.backendService.deleteUserFriend(this.user.id, id).subscribe();
    for (let i = 0; i < this.backendService.friendList.length; i++) {
      if (this.backendService.friendList[i].id === id) {
        this.backendService.friendList.splice(i, 1);
      }
    }

  }

  addFriend(): void {
    this.backendService.addFriend(this.user.id, this.friend.value).subscribe( () => {
      this.backendService.getUserFriends(this.user.id).subscribe(res => {
        if (res[0] == null) {
          this.backendService.friendList = [];
        } else {
          this.backendService.friendList = res;
        }
      });
    });
  }

  openFriendProfile(): void {
    this.dialog.open(ProfileInspectionComponent, {
      width: '1000px',
      height: '800px'
    });
  }
}
