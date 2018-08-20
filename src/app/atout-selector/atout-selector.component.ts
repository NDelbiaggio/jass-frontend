import { AtoutService } from '../services/atout.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-atout-selector',
  templateUrl: './atout-selector.component.html',
  styleUrls: ['./atout-selector.component.scss']
})
export class AtoutSelectorComponent implements OnInit {

  @Input('selfPlayer') selfPlayer: string;

  chooseAtout: boolean = false;
  hadChibre: boolean = false;
  atoutMessage: string = 'Your turn to choose atout';

  constructor(private atoutService: AtoutService) {

  }

  ngOnInit() {
    this.subscribeToChooseAtout();
    this.subscribeToChibre();
  }

  subscribeToChooseAtout() {
    this.atoutService.chooseAtoutObservable()
    .subscribe((player) => {
      console.log('username: ', this.selfPlayer);
      console.log('choose atout without chibre, player: ', player);
      if (player === this.selfPlayer) {
        this.chooseAtout = true;
      }
    });
  }

  subscribeToChibre() {
    this.atoutService.chibreObservable()
      .subscribe(player => {
        console.log('username: ', this.selfPlayer);
        console.log('chibre, player to chose: ', player);
        if (player === this.selfPlayer) {
          this.hadChibre = true;
          this.chooseAtout = true;
        }
      });
  }

  sendAtout(atout: string) {
    this.atoutService.atoutSubject().next(atout);
    this.chooseAtout = false;
    this.hadChibre = false;
  }

  chibrer() {
    this.atoutService.chibreObservable().next();
    this.hadChibre = false;
    this.chooseAtout = false;
  }

}
