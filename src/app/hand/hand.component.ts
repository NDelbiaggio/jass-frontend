import { Plie } from './../models/plie';
import { AtoutService } from './../services/atout.service';
import { UtilsService } from './../utils.service';
import { PlayService } from './../services/play.service';
import { CardDistributionService } from '../services/card-distribution.service';
import { Card } from '../models/card';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input('selfPlayer') selfPlayer;
  @Input('isPlayAuto') isPlayAuto: boolean = false;

  cards: Card[] = [];
  plie: Plie;
  atout: string;

  myTurnToPlay: boolean = false;

  constructor(
    private cardDistributionService: CardDistributionService,
    private playService: PlayService,
    private utilsService: UtilsService,
    private atoutService: AtoutService
  ) {}

  ngOnInit() {
    this.cardDistributionSubcription();
    this.myTurnSubscription();
  }

  cardDistributionSubcription() {
    this.cardDistributionService.cardDistributionObservable()
    .subscribe((cards) => {
      this.cards = cards;
    });
  }

  myTurnSubscription() {
    this.playService.turnObservable()
      .subscribe((player) => {
        if (player === this.selfPlayer) {
          this.plie = this.playService.play.getLastPlie();
          this.atout = this.atoutService.atout;
          this.myTurnToPlay = true;
          if (this.isPlayAuto) {
            this.playAuto();
          }
        }
      });
  }

  playCard(card) {
    if (this.myTurnToPlay) {
      const ind = this.cards.indexOf(card);
      this.cards.splice(ind, 1);
      this.playService.playCard(card);
      this.myTurnToPlay = false;
    }
  }

  isCardPlayable(card): boolean {
    if (this.plie.isFull()) { return true; }
    return this.utilsService.isCardPlayable(card, this.atout, this.plie, this.cards);
  }

  playAuto() {
    setTimeout(() => {
      this.cards.forEach(card => {
        if (this.isCardPlayable(card)) {
          return this.playCard(card);
        }
      });
    }, 1500);
  }

}
