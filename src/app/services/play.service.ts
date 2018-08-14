import { AtoutService } from './atout.service';
import { Play } from './../models/play';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Card } from '../models/card';
import { Plie } from '../models/plie';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  socket: any;

  play:Play =  new Play();

  cardPlayedEvent: string = 'card played';
  playEvent: string = 'play';
  plieEvent: string = 'plie';
  turnEvent: string = 'turn';
  // yourTurnEvent: string = 'your turn';


  constructor(
    private websocketService: WebsocketService,
    private atoutService: AtoutService
  ) {}

  cardPlayedObservable(): Observable<Plie>{
    if(!this.socket){
      this.socket = this.websocketService.socket;
    }

    let observable = new Observable(observer =>{
      this.socket.on(this.cardPlayedEvent, ({card}: any)=>{
        let cardObj = Object.assign(new Card(), card);
        this.play.playACard(this.atoutService.atout, cardObj);
        observer.next();
      });

      this.socket.on(this.plieEvent, ({plie})=>{
        let plieObj: Plie = Object.assign(new Plie(), plie);        
        let cards: Card[] = [];      
        plie.cards.forEach(card => {
          let cardObj: Card = Object.assign(new Card(), card);
          cards.push(cardObj);
        });
        plieObj.setCards(cards);
        this.play.addPlie(plieObj);
        
        observer.next();
      });

    })
      .pipe(map(()=>{        
        return this.play.getLastPlie();
      }));

    return observable;
  }

  playCard(card: Card): void{
    this.socket.emit(this.playEvent, card);
  }

  // myTurnObservable(): Observable<string>{
  //   if(!this.socket){
  //     this.socket = this.websocketService.socket;
  //   }
  //   return new Observable(observer =>{
  //     this.socket.on('your turn', ()=>{
  //       observer.next();
  //     })
  //   })
  // }

  turnObservable(): Observable<string>{
    if(!this.socket){
      this.socket = this.websocketService.socket;
    }
    return new Observable(observer =>{
      this.socket.on(this.turnEvent, ({player})=>{
        observer.next(player);
      })
    })
  }
}
