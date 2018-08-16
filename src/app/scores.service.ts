import { WebsocketService } from './services/websocket.service';
import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  socket: any;

  scoreEvent: string = 'scores';

  constructor(
    private websocketService: WebsocketService
  ) { }

  scoresObservable(): Observable<any> {
    if (!this.socket) {
      this.socket = this.websocketService.socket;
    }
    return new Observable(observer => {
      this.socket.on(this.scoreEvent, (scores: {totalA, totalB, playPointsA, playPointsB}) => {
        observer.next(scores);
      });
    });
  }
}
