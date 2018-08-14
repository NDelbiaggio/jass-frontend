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

  constructor(private atoutService: AtoutService) { 

  }

  ngOnInit() {
    this.subscribeToChooseAtout();
    this.atoutService.atoutSubject()
      .subscribe(atout =>{
        console.log("Atout is ", atout)
      })
  }

  subscribeToChooseAtout(){
    this.atoutService.chooseAtoutObservable()
    .subscribe((player)=>{
      if(player == this.selfPlayer){
        this.chooseAtout = true;
      }
    });
  }

  sendAtout(atout: String){
    this.atoutService.atoutSubject().next(atout);
    this.chooseAtout = false;
  }

}
