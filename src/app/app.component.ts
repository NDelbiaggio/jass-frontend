import { PlayService } from './services/play.service';
import { AtoutService } from './services/atout.service';
import { WebsocketService } from './services/websocket.service';
import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  players = [];

  playerTop: string = 'Player';
  playerLeft: string = 'Player';
  playerRight: string = 'Player';
  username: string = 'Me';

  atout: string;

  error: string = '';

  isDevMode: boolean = isDevMode();
  isPlayAuto: boolean = false;
  displayPrevTrick: boolean = false;

  constructor(
    private websocket: WebsocketService,
    private atoutService: AtoutService
  ) {
    this.username = 'Player ' + Math.trunc(Math.random() * (100 - 1) + 1);
  }

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.websocket.connect(this.username);
    this.subscribeToPlayerJoined();
    this.subscribeToAtout();
    this.subscribeToErrors();
    this.subscribePlayerLeft();
  }

  subscribeToPlayerJoined() {
    this.websocket.playerJoinedObservable()
      .subscribe(players => {
        this.players = players;
        this.updatePlayers();
      });
  }

  subscribeToAtout() {
    this.atoutService.atoutSubject()
      .subscribe(atout => {
        this.atout = atout;
      });
  }

  subscribeToErrors() {
    this.websocket.errorNotAllowedObservable()
    .subscribe((message) => {
      this.error = message;
      console.log(message);
    });
  }

  subscribePlayerLeft() {
    this.websocket.playerLeftObservable()
      .subscribe(player => {
        const indPlayer = this.players.indexOf(player);
        this.players.splice(indPlayer, 1);
        if (this.playerLeft === player) {
          this.playerLeft = '';
        } else if (this.playerRight === player) {
          this.playerRight = '';
        } else if (this.playerTop === player) {
          this.playerTop = '';
        }
      });
  }

  updatePlayers() {
    const ind = this.players.findIndex(p => p.name === this.username);
    for (let i = 0; i < this.players.length; i++) {
        const diff = ind - i;
        if (diff === 2 || diff === -2) {
          this.playerTop = this.players[i].name;
        } else if (diff === 1 || diff === -3) {
          this.playerLeft = this.players[i].name;
        } else if (diff === -1 || diff === 3) {
          this.playerRight = this.players[i].name;
        }
    }
  }

  mousedown(){ this.displayPrevTrick = true; }

  mouseup(){ this.displayPrevTrick = false; }
}
