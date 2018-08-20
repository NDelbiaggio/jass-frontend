import { Card } from './card';
export class Action {

    constructor(
        public player: string,
        public card: Card
    ) {}
}
