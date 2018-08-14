import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../models/card';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDistributionService {

  socket: any;

  cardsDistribEvent:String = "cards distribution";

  constructor(private websocketService: WebsocketService) { 
    
  }

  cardDistributionObservable(): Observable<Card[]>{
    this.socket = this.websocketService.socket;
    return new Observable(observer =>{
      this.socket.on(this.cardsDistribEvent, ({cards})=>{
        observer.next(cards);
      });
    }).pipe(map((cards: any[]) =>{
      let handCards: Card[] = [];
      cards.forEach(card => {
        let cardObj: Card = Object.assign(new Card(), card);
        handCards.push(cardObj);
      });
      handCards.sort((a, b)=>{
        return a.sortIndex - b.sortIndex;
      })
      return handCards;
    }));
  }

}
