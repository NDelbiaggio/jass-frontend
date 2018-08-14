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

  constructor(private websocketService: WebsocketService) { 
    this.socket = websocketService.socket;
  }

  chooseAtoutObservable(): Observable<string>{
    if(!this.socket){
      this.socket = this.websocketService.socket;
    }
    return new Observable(observer =>{
      this.socket.on(this.chooseAtoutEvent, ({player})=>{
        observer.next(player);
      });
    });
  }

  atoutSubject(){
    if(!this.socket){
      this.socket = this.websocketService.socket;
    }
    let observable = new Observable(observer=>{
      this.socket.on(this.atoutEvent, ({atout})=>{
        this.atout = atout;
        observer.next(atout);
      });
    });

    let observer = {
      next: (atout)=>{
        this.socket.emit(this.atoutEvent, atout);
      }
    }

    return  Subject.create(observer, observable);
  }

}
