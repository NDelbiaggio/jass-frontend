import { AtoutService } from './atout.service';
import { Play } from './../models/play';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Card } from '../models/card';
import { Plie } from '../models/plie';
import { Action } from '../models/action';


@Injectable({
  providedIn: 'root'
})
export class PlayService {

  socket: any;

  play: Play =  new Play();

  cardPlayedEvent: string = 'card played';
  playEvent: string = 'play';
  plieEvent: string = 'trick';
  turnEvent: string = 'turn';

  cardObservable$: Observable<Plie>;

  constructor(
    private websocketService: WebsocketService,
    private atoutService: AtoutService
  ) {}

  listenCardEvent(){
    if (!this.socket) { this.socket = this.websocketService.socket;}

    let cardEmitter: EventEmitter<Plie> = new EventEmitter();

    const cardObservable: Observable<any> = new Observable((observer)=>{
      this.socket.on(this.cardPlayedEvent, ({card, player})=>{
        const cardObj: Card = Object.assign(new Card(), card);
        const action = new Action(player, cardObj);
        this.play.playACard(this.atoutService.atout, action);
        observer.next();
      });

      this.socket.on(this.plieEvent, ({trick}) => {
        const plieObj: Plie = Object.assign(new Plie(), trick);

        const actions: Action[] = [];
        trick.actions.forEach(action => {
          const cardObj: Card = Object.assign(new Card(), action.card);
          actions.push(new Action(action.playerName , cardObj));
        });

        plieObj.setCards(actions);
        this.play.addPlie(plieObj);
        observer.next();
      });
    });
    
    cardObservable.subscribe(() => {
      cardEmitter.emit(this.play.getLastPlie());
    });

    return cardEmitter.asObservable();
  }

  cardPlayedObservable(): Observable<Plie> {
    if(!this.cardObservable$){
      this.cardObservable$ = this.listenCardEvent();
    }
    return  this.cardObservable$;
  }

  playCard(card: Card, callback: Function): void {
    this.socket.emit(this.playEvent, card, callback);
  }

  turnObservable(): Observable<string> {
    if (!this.socket) {
      this.socket = this.websocketService.socket;
    }
    return new Observable(observer => {
      this.socket.on(this.turnEvent, ({player}) => {
        observer.next(player);
      });
    });
  }
}
