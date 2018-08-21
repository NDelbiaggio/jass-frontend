import { Action } from './action';
import { Trick } from './plie';
import { Card } from './card';


export class Play {

    constructor(
        public tricks: Trick[] = []
    ) {
        this.createNewPlie();
    }

    /**
     * Returns the first plie
     * @returns {plie} the first plie
     */
    getFirstPlie(): Trick {
        return this.tricks[0];
    }

    /**
     * Returns the last plie
     * @returns {Trick} the las plie
     */
    getLastPlie(): Trick {
        return this.tricks[this.tricks.length - 1];
    }

    /**
     * Returns the plie just before the last one
     * @returns {Trick} the plie before the last one
     */
    getPreviousPlie(): Trick {
        if(this.getNumberPlies() == 1){ return; };
        return this.tricks[this.tricks.length - 2];
    }

    /**
     * Returns the number of plies in the play
     * @returns {number} number of plies
     */
    getNumberPlies(): number {
        return this.tricks.length;
    }

    /**
     * Create a new plie and add it to plies. The number of the plie is the incrementation of the last plie number by one.
     * @returns {Trick} plie
     */
    createNewPlie(): Trick {
        const nextPlieNumber = (this.getNumberPlies() === 0 ? 1 : this.getLastPlie().number + 1);
        const plie = new Trick(nextPlieNumber);
        this.tricks.push(plie);
        return plie;
    }

    /**
     * Add the plie received in the plies array
     * @param plie
     */
    addPlie(plie: Trick) {        
        if(this.getLastPlie().isEmpty()) {
            this.tricks.pop();
        }
        this.tricks.push(plie);
    }

    /**
     * Removes all the plies in the play
     */
    clearPlies(): void {
        this.tricks = [];
    }

    /**
     * Add the card received into the last plie, if there is no plie or the last plie is full it will create a new plie and add it to it.
     * @param {string} atout
     * @param {Card} card
     * @returns {boolean} if the card has been added.
     */
    playACard(atout: string, action: Action) {
        const lastPlie = this.getLastPlie();
        if (lastPlie.isFull()) {
            const newPlie = this.createNewPlie();
            return newPlie.playCard(atout, action);
        } else {
            return lastPlie.playCard(atout, action);
        }
    }
}
