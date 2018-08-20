import { Plie } from './../models/plie';
import { PlayService } from './../services/play.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  plie: Plie;

  constructor(private playService: PlayService) {
  }

  ngOnInit() {
    this.playService.cardPlayedObservable()
      .subscribe(plie => {
        this.plie = plie;
        if (this.plie.isFull()) {
          setTimeout(() => {
            this.plie = null;
          }, 1000);
        }
      });
  }

}
