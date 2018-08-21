import { Action } from './action';
import { Card } from './card';
export class Trick {

    private cardsLimit = 4;

    constructor(
        public number: number = 0,
        private actions: Action[] = [],
        public highestCardIndex?: number,
        public leadingPlayer?: string,
        public lastPlayer?: string
    ) {}

    /**
     * Add the card to the cards if the trick is not full
     * @param {Card} card
     * @returns {boolean} return true if the card has been added.
     */
    playCard(atout: string, action: Action): boolean {
        if (this.isFull()) { return false; }
        this.actions.push(action);
        this.setHighestCardIndex(atout, action.card);
        return true;
    }

    /**
     * Returns the number of cards in the trick
     * @returns {number} number of cards
     */
    getNumberCards(): number {
        return this.actions.length;
    }

    /**
     * Returns the leading card of the trick
     * @returns {Card} the leading card of the trick
     */
    getLeadingCard(): Card {
        return this.actions[this.highestCardIndex].card;
    }

    /**
     * Returns the name of the leading player
     * @returns {string} name of the leading player
     */
    getLeadingPlayer(): string {
        const leadingAction = this.actions[this.highestCardIndex];
        if (!leadingAction) {
            return;
        }
        return leadingAction.player  ;
    }

    /**
     * Returns the first card of the trick
     * @returns {Card} the first card of the trick
     */
    getFirstCard(): Card {
        return this.actions[0].card;
    }

    /**
     * Returns if the trick is full or if at least one card can be played
     * @returns {boolean} return true if no more cards can be added
     */
    isFull(): boolean {
        return this.actions.length === this.cardsLimit;
    }

    /**
     * Returns true if there is no cards in the trick
     */
    isEmpty(): boolean {
        return this.actions.length == 0;
    }

    /**
     * Returns the cards of the trick
     * @returns {[Card]} the cards of the trick
     */
    getCards(): Card[] {
        const cards: Card[] = [];
        this.actions.forEach(action => {
            cards.push(action.card);
        });
        return cards;
    }

    /**
     * Set the cards of the trick with the one received as a parameter
     * @param cards
     */
    setCards(actions: Action[]) {
        this.actions = actions;
    }

    /**
     * Returns actions of the trick
     * @returns {Action[]} actions of the trick
     */
    getActions() : Action[] {
        return this.actions;
    }

    /**
     * Check if the card is higher than the leading card, and update the highestCardIndex if needed.
     * @param atout
     * @param card
     */
    private setHighestCardIndex(atout, card) {
        if (this.getNumberCards() === 1) {
            return this.highestCardIndex = 0;
        }
        if (this.isCardHigher(atout, card)) {
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
    private isCardHigher(atout, card) {
        if (card.type === atout && this.getLeadingCard().type !== atout) { return true; }
        if (card.type !== atout && this.getLeadingCard().type === atout) { return false; }
        if (card.type !== atout && this.getLeadingCard().type !== atout) {
            if (card.type !== this.getLeadingCard().type) { return false; }
            return card.power > this.getLeadingCard().power;
        } else {
            return card.trumpPower > this.getLeadingCard().trumpPower;
        }
    }



}
