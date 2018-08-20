import { PlayService } from './../services/play.service';
import { Component, OnInit, Input } from '@angular/core';
import { AtoutService } from '../services/atout.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input('player') player: string;


  hasToPlay: boolean = false;
  hasToChooseAtout: boolean = false;
  isLeading: boolean = false;

  constructor(
    private atoutService: AtoutService,
    private playService: PlayService
  ) { }

  ngOnInit() {
    this.subscribeChooseAtout();
    this.subscribeTurn();
    this.subscribeAtout();
    this.subscribeCardPlayed()
  }

  subscribeAtout(){
    this.atoutService.atoutSubject()
      .subscribe(atout =>{
        this.hasToChooseAtout = false;
      });
  }

  subscribeChooseAtout() {
    this.atoutService.chooseAtoutObservable()
      .subscribe(player => {
        this.hasToChooseAtout = this.player === player;
      });
  }

  subscribeTurn() {
    this.playService.turnObservable()
      .subscribe(player => {
        this.hasToPlay = this.player === player;
      });
  }

  subscribeCardPlayed(){
    this.playService.cardPlayedObservable()
      .subscribe((plie) => {
        this.isLeading = this.player === plie.getLeadingPlayer();
      });
  }
}
