import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtoutService {

  public atout: string;

  private socket: any;

  private chooseAtoutEvent: string = 'choose trump';
  private atoutEvent: string = 'trump';
  private chibreEvent: string = 'chibre';

  private atoutSubject$: Subject<string>;
  private chooseAtout$: Observable<string>;

  constructor(private websocketService: WebsocketService) {
    this.socket = websocketService.socket;
  }
  cpt = 0;
  /**
   * Returns an observable that notifies the player name that has to choose atout
   * @returns {Observable<string>} player that has to choose atout
   */
  chooseAtoutObservable(): Observable<string> {
    if(this.chooseAtout$) { return this.chooseAtout$; }    
    if (!this.socket) { this.socket = this.websocketService.socket; }
    return this.chooseAtout$ = new Observable(observer => {
      this.socket.on(this.chooseAtoutEvent, ({player}) => {
        observer.next(player);
      });
    });
  }

  /**
   * Return a subject for notifying atout
   * @returns {Subject<string>} atout
   */
  atoutSubject(): Subject<string> {
    if (this.atoutSubject$){ return this.atoutSubject$; }
    if (!this.socket) {
      this.socket = this.websocketService.socket;
    }
    const observable = new Observable(observer => {
      this.socket.on(this.atoutEvent, ({trump}) => {
        this.atout = trump;
        observer.next(trump);
      });
    });

    const observer = {
      next: (trump) => {
        this.socket.emit(this.atoutEvent, trump);
      }
    };

    this.atoutSubject$ = Subject.create(observer, observable);
    return  this.atoutSubject$;
  }

  /**
   * Return a subject with an obsevable of the chibre event
   * @returns {Subject<string>} return the name of the new player that has to select atout.
   */
  chibreObservable(): Subject<string> {
    if (!this.socket) {
      this.socket = this.websocketService.socket;
    }
    const observable = new Observable(observer => {
      this.socket.on(this.chibreEvent, ({player}) => {
        observer.next(player);
      });
    });

    const observer = {
      next: () => {
        this.socket.emit(this.chibreEvent);
      }
    };
    return Subject.create(observer, observable);
  }

}
