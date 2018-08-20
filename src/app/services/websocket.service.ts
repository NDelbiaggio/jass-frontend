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
    //this.socket.emit(this.addPlayerEvent, name);
    this.testDisconnection(name);
    return () => {this.socket.disconnect(); };
  }

  /**
   * Is notified when a player joins
   * @returns {Observable<string>} player name
   */
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

  /**
   * Is notified when a player leaves the game
   * @returns {Observable<string>} player name
   */
  playerLeftObservable(): Observable<string> {
    return new Observable(observer => {
      this.socket.on(this.playerLeftEvent, (playerName) => {
        observer.next(playerName);
      });
    });
  }

  testDisconnection(name) {
    this.socket.on('disconnect', (res) => {
      console.log('disconnect: ', res);
      this.socket.connect();
    });

    this.socket.on('connect', ()=>{
      console.log('connect');
      this.socket.emit(this.addPlayerEvent, name);
    });

    this.socket.on('connect_error', (obj)=>{
      console.log('connect_error: ', obj)
    })

    this.socket.on('connect_timeout', ()=>{
      console.log('connect_timeout')
    })

    this.socket.on('reconnect', (number)=>{
      console.log('reconnect: ', number);
    })

    this.socket.on('reconnect_attempt', ()=>{
      console.log('reconnect_attempt')
    })

    this.socket.on('reconnecting', (number)=>{
      console.log('reconnecting: ', number)
    })

    this.socket.on('reconnect_error', (obj)=>{
      console.log('reconnect_error: ', obj)
    })

    this.socket.on('reconnect_failed', ()=>{
      console.log('reconnect_failed');
    })

  }
}
