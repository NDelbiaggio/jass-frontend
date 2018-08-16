import { ScoresService } from './../scores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores-board',
  templateUrl: './scores-board.component.html',
  styleUrls: ['./scores-board.component.scss']
})
export class ScoresBoardComponent implements OnInit {

  totalPointsA: number;
  totalPointsB: number;
  playPointsA: number;
  playPointsB: number;

  constructor(
    private scoresService: ScoresService
  ) { }

  ngOnInit() {
    this.scoresSubscription();
  }

  scoresSubscription() {
    this.scoresService.scoresObservable()
      .subscribe(({totalA, totalB, playPointsA, playPointsB}) => {
        this.totalPointsA = totalA;
        this.totalPointsB = totalB;
        this.playPointsA = playPointsA;
        this.playPointsB = playPointsB;
      });
  }

}
