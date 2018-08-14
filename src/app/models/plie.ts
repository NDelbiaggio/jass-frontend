import { Card } from './card';
export class Plie {

    cardsLimit = 4;

    constructor(
        public number: number = 0,
        private cards: Card[] = [],
        public highestCardIndex?: number,
        public leadingPlayer?: string,
        public lasPlayer?: string
    ){}

    /**
     * Add the card to the cards if the plie is not full
     * @param {Card} card
     * @returns {boolean} return true if the card has been added. 
     */
    playCard(atout:string, card: Card): boolean{
        if (this.isFull()) return false;
        this.cards.push(card);
        this.setHighestCardIndex(atout, card);
        return true;
    }

    /**
     * Returns the number of cards in the plie
     * @returns {number} number of cards
     */
    getNumberCards(): number{
        return this.cards.length;
    }

    /**
     * Returnds the leading card of the plie
     * @returns {Card} the leading card of the plie
     */
    getLeadingCard(): Card{
        return this.cards[this.highestCardIndex];
    }

    /**
     * Returns the first card of the plie
     * @returns {Card} the first card of the plie
     */
    getFirstCard(): Card{
        return this.cards[0];
    }

    /**
     * Returns if the plie is full or if at least one card can be played
     * @returns {boolean} return true if no more cards can be added
     */
    isFull(): boolean{
        return this.cards.length == this.cardsLimit;
    }

    /**
     * Returns the cards of the plie
     * @returns {[Card]} the cards of the plie
     */
    getCards(): Card[]{
        return this.cards;
    }

    /**
     * Set the cards of the plie with the one received as a parameter
     * @param cards 
     */
    setCards(cards: Card[]){
        this.cards = cards;
    }

    /**
     * Check if the card is higher than the leading card, and update the highestCardIndex if needed.
     * @param atout 
     * @param card 
     */
    private setHighestCardIndex(atout, card){
        if(this.getNumberCards() == 1){
            return this.highestCardIndex = 0;
        }
        if(this.isCardHigher(atout, card)){
            return this.highestCardIndex = this.getNumberCards() - 1;
        }
        return this.highestCardIndex; 
    }
    
    /**
     * Return true if the card recived as a parameter is higher than the leading card
     * @param {string} atout 
     * @param {Card} card 
     * @returns {boolean} returns true if the card is higher than the leading card
     */
    private isCardHigher(atout, card){
        if(card.type == atout && this.getLeadingCard().type != atout) return true;
        if(card.type != atout && this.getLeadingCard().type == atout) return false;
        if(card.type != atout && this.getLeadingCard().type != atout){
            if(card.type != this.getLeadingCard().type) return false;
            return card.power > this.getLeadingCard().power
        }else{
            return card.atoutPower > this.getLeadingCard().atoutPower
        }
    }


    
}
