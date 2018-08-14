import { Plie } from "./plie";
import { Card } from "./card";

export class Play {

    constructor(
        private plies: Plie[] = []
    ){
        this.createNewPlie()
    }

    /**
     * Returns the first plie
     * @returns {plie} the first plie
     */
    getFirstPlie(): Plie{
        return this.plies[0];
    }

    /**
     * Returns the last plie
     * @returns {Plie} the las plie
     */
    getLastPlie(): Plie{
        return this.plies[this.plies.length - 1];
    }

    /**
     * Returns the plie just before the last one
     * @returns {Plie} the plie before the last one
     */
    getPreviousPlie(): Plie{
        return this.plies[this.plies.length - 2];
    }

    /**
     * Returns the number of plies in the play
     * @returns {number} number of plies
     */
    getNumberPlies(): number{
        return this.plies.length;
    }

    /**
     * Create a new plie and add it to plies. The number of the plie is the incrementation of the last plie number by one.
     * @returns {Plie} plie
     */
    createNewPlie(): Plie{
        let nextPlieNumber = (this.getNumberPlies() == 0? 1 : this.getLastPlie().number);
        let plie = new Plie(nextPlieNumber);
        this.plies.push(plie);
        return plie;
    }

    /**
     * Add the plie received in the plies array
     * @param plie 
     */
    addPlie(plie: Plie){
        this.plies.push(plie);
    }
    
    /**
     * Removes all the plies in the play
     */
    clearPlies() : void{
        this.plies = [];
    }
    
    /**
     * Add the card received into the last plie, if there is no plie or the last plie is full it will create a new plie and add it to it.
     * @param {string} atout
     * @param {Card} card 
     * @returns {boolean} if the card has been added.
     */
    playACard(atout: string, card: Card){
        let lastPlie = this.getLastPlie();
        if(lastPlie.isFull()){
            let newPlie = this.createNewPlie();
            return newPlie.playCard(atout, card);
        }else {
            return lastPlie.playCard(atout, card);
        }
    }
}
