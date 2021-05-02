import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendService} from '../../shared/service/backend.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  opponent: FormControl;
  game = false;
  public userScore: any = [];
  public opponentScore: any = [];
  dataSource: any = [];
  displayedColumns: string[] = [ 'index', 'username1', 'score1', 'username2', 'score2'];

  @Input()
  user: any;
  @Input()
  userList: any = [];
  // @Input()
   games: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public backendService: BackendService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.opponent = new FormControl(null);
    this.form = new FormGroup({
      opponent: this.opponent
    });
  }

  ngOnInit(): void {
    //console.log('games', this.games)
    this.backendService.getGames(this.user.id).subscribe(res => {
      this.games = res;
      this.dataSource = new MatTableDataSource (this.games);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  saveGame(): void {
    let userScore = 0;
    let opponentScore = 0;
    for (let i = 0; i < 10; i++) {
      userScore += this.userScore[i] == null ? 0 : this.userScore[i];
      opponentScore += this.opponentScore[i] == null ? 0 : this.opponentScore[i];
    }
    this.backendService.saveGame(this.user.id, this.opponent.value.id, userScore, opponentScore).subscribe(() => {
      this.backendService.getGames(this.user.id).subscribe(res => {
        this.games = res;
        this.dataSource = new MatTableDataSource (this.games);
        this.dataSource.paginator = this.paginator;
      });
    });
    this.game = false;
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
