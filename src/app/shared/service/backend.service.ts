import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  friendList: any = [];

  constructor(private http: HttpClient) {

  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  }

  login(loginForm: any): Observable<any> {
    const url = 'api/user/login';
    const options = {
      headers: this.getHeaders()
    };
    return this.http.post(url, JSON.stringify(loginForm), options).pipe();
  }

  registerUser(registrationForm: any): Observable<any> {
    const url = 'api/user/create';
    const options = {
      headers: this.getHeaders()
    };
    return this.http.post(url, JSON.stringify(registrationForm), options).pipe();
  }

  getUsers(): Observable<any> {
    const url = 'api/user';
    const options = {
      headers: this.getHeaders()
    };
    return this.http.get(url, options).pipe();
  }

  getUserComments(id: number): Observable<any> {
    const url = 'api/user/comment/' + id;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.get(url, options).pipe();
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = 'api/user/update/' + id;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.post(url, user, options).pipe();
  }

  getUserFriends(id: number): Observable<any> {
    const url = 'api/user/friends/' + id;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.get(url, options).pipe();
  }

  deleteUserFriend(id: number, id2: number): Observable<any> {
    const url = 'api/user/friend/delete/' + id + '/' + id2;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.put(url, options).pipe();
  }

  addFriend(id: number, id2: number): Observable<any> {
    const url = 'api/user/friend/add/' + id + '/' + id2;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.put(url, options).pipe();
  }

  saveGame(id: number, id2: number, score1: number, score2: number): Observable<any> {
    const url = 'api/game/saveGame/';
    const options = {
      headers: this.getHeaders()
    };
    const game = {player1: id, player2: id2, score1, score2};
    return this.http.post(url, game, options).pipe();
  }

  getGames(id: number): Observable<any> {
    const url = 'api/game/getGame/' + id;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.get(url, options).pipe();
  }


}
