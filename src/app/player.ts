export class Player {
    constructor(
        public name: string,
        public turn: number,
        public score: number,
        public validator: boolean
    ) { }

    validatePlayer(input) {
        if (input) {
            this.validator = true;
        } else {
            this.validator = false;
        }
    }
}

