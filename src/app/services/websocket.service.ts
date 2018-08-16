import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket: any;

  private addPlayerEvent: string = 'add player';
  private playerJoindedEvent: string = 'player joined';
  private playersEvent: string = 'players';
  private playerLeftEvent: string = 'player left';

  constructor() {}

  connect(name) {
    this.socket = io.connect(environment.ws_url);
    this.socket.emit(this.addPlayerEvent, name);
    return () => {this.socket.disconnect(); };
  }

  playerJoinedObservable(): Observable<any> {
    return new Observable(observer => {
      this.socket.on(this.playersEvent, (players) => {
        observer.next(players);
      });
      this.socket.on(this.playerJoindedEvent, ({players}) => {
        observer.next(players);
      });
    });
  }

  errorNotAllowedObservable(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('not allowed', ({message}) => {
        observer.next(message);
      });
    });
  }

  playerLeftObservable(): Observable<string> {
    return new Observable(observer => {
      this.socket.on(this.playerLeftEvent, (playerName) => {
        observer.next(playerName);
      });
    });
  }
}
