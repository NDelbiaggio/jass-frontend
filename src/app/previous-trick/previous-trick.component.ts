import { PlayService } from './../services/play.service';
import { Trick } from './../models/plie';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-previous-trick',
  templateUrl: './previous-trick.component.html',
  styleUrls: ['./previous-trick.component.scss']
})
export class PreviousTrickComponent implements OnInit {

  @Input('display') display: boolean = false;

  previousTrick: Trick;

  constructor(
    private playService: PlayService
  ) { }

  ngOnInit() {
    this.playService.cardPlayedObservable()
      .subscribe( () => {
        let prevTrick = this.playService.play.getPreviousPlie();
        if(prevTrick){
          this.previousTrick = this.playService.play.getPreviousPlie()
        }
      })
  }

}
