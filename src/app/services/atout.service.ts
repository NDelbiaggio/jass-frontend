import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtoutService {

  public atout: string;

  private socket: any;

  private chooseAtoutEvent: string = 'choose atout';
  private atoutEvent: string = 'atout';
  private chibreEvent: string = 'chibre';

  constructor(private websocketService: WebsocketService) {
    this.socket = websocketService.socket;
  }

  /**
   * Returns an observable of the event that notifies which player has to choose atout
   * @returns {Observable<string>} player that has to choose atout
   */
  chooseAtoutObservable(): Observable<string> {
    if (!this.socket) {
      this.socket = this.websocketService.socket;
    }
    return new Observable(observer => {
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
    if (!this.socket) {
      this.socket = this.websocketService.socket;
    }
    const observable = new Observable(observer => {
      this.socket.on(this.atoutEvent, ({atout}) => {
        this.atout = atout;
        observer.next(atout);
      });
    });

    const observer = {
      next: (atout) => {
        this.socket.emit(this.atoutEvent, atout);
      }
    };

    return  Subject.create(observer, observable);
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
