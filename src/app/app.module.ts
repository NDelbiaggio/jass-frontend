import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HandComponent } from './hand/hand.component';
import { AtoutSelectorComponent } from './atout-selector/atout-selector.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ScoresBoardComponent } from './scores-board/scores-board.component';
import { PlayerComponent } from './player/player.component';
import { PreviousTrickComponent } from './previous-trick/previous-trick.component';

@NgModule({
  declarations: [
    AppComponent,
    HandComponent,
    AtoutSelectorComponent,
    PlaygroundComponent,
    ScoresBoardComponent,
    PlayerComponent,
    PreviousTrickComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
