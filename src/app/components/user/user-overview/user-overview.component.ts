import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from '../../../shared/service/backend.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ChangeDetectorRef} from '@angular/core';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})

export class UserOverviewComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'index', 'name', 'username', 'surname', 'score'];
  dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user: any;
  userList: any = [];
  comments: any = [];
  games: any = [];

  constructor(private router: Router,
              private backendService: BackendService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = history.state.data;
    this.backendService.getUsers().subscribe(res => {
      for (let i = 0; i < (res as Array<any>).length; i++) {
          this.userList.push(res[i]);
      }

      this.backendService.getGames(this.user.id).subscribe(games => {
        this.games = games;
        /** Dodajemy userom ich zdobycz punktowa */
        for (const user of this.userList) {
          let score = 0;
          for (const game of this.games) {
            score += this.shallowEqual(user, game.player1) ?  game.score1 : this.shallowEqual(user, game.player2) ? game.score2 : 0;
          }
          user.score = score;
        }
        console.log('po dodaiu score', this.userList);
        // this.dataSource = this.userList.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
       // this.dataSource.paginator = this.paginator;
        this.dataSource = new MatTableDataSource (this.userList.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRef.detectChanges();
        console.log('datasource', this.dataSource)

      });
    });
    console.log(this.userList);

    this.backendService.getUserFriends(this.user.id).subscribe(res => {
      if (res[0] == null) {
        this.backendService.friendList = [];
      } else {
        this.backendService.friendList = res;
      }
    });



    this.backendService.getUserComments(this.user.id).subscribe(res => {
      this.comments = res;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  logout(): void {
    this.router.navigate(['/']);
  }

  profileDetails(): void {
    this.router.navigate(['/profile-details'], {state: {data: this.user}});
  }

  friendsOverview(): void {
    this.router.navigate(['/friends-overview'], {state: {data: this.user, users: this.userList}});
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   shallowEqual(object1, object2): boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.indexOf('friends') >= 0) {
       keys1.splice(keys1.indexOf('friends'), 1);
     }

    if (keys2.indexOf('friends') >= 0) {
       keys2.splice(keys2.indexOf('friends'), 1);
     }

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

}
