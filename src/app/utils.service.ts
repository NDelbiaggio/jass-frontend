import { Plie } from './models/plie';
import { Card } from './models/card';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Return true if the card is playable according to the plie, atout and the cards in hand
   * @param {Card} card 
   * @param {string} atout 
   * @param {Plie} plie 
   * @param {[Card]} cardsInHand 
   * @returns {boolean} return if the card is playable or not
   */
  isCardPlayable(card: Card, atout: string, plie: Plie, cardsInHand: Card[]): boolean{
      if (plie.getNumberCards() == 0) {
          return true;
      }
      const firstCardPlayed = plie.getFirstCard();
      const leadingCard = plie.getLeadingCard();  
      if (card.type == firstCardPlayed.type) {
          return true;
      }  
      if (firstCardPlayed.type != atout) {
          if (card.type == atout) {
              if (leadingCard.type != atout) {
                  return true;
              } else { 
                  if (card.atoutPower > leadingCard.atoutPower) {
                      return true;
                  } else {
                      const result = cardsInHand.find((c) => {
                          return c.type != atout;
                      });
                      if (result) return false;
                      const res = cardsInHand.find((c) => {
                          return c.type == atout && c.atoutPower > leadingCard.atoutPower && c.atoutPower != 9;
                      });
                      if (res) return false; 
                      return true;
                  }
              }
          } else {
              let result = cardsInHand.find(c => {
                  return c.type == firstCardPlayed.type;
              });
              if (result) return false;
              return true;
          }
      } else {
          let result = cardsInHand.find(c => {
              return c.type == firstCardPlayed.type && c.atoutPower != 9;
          });
          if (result) return false;
          return true;  
      }
  }
}
