//Definition of Class Player

const color = [ "green", "red", "blue", "yellow"];

class player {
    constructor(name, colorIndex) {
        this._name = name,
        this._color = color[colorIndex],
        this._home = Array.from(document.querySelectorAll(`.${this._color}.home`));
        this._finish = Array.from(document.querySelectorAll(`.${this._color}.finish`));
        this._start = 10 * colorIndex;
        this._pieces = [
            -1,
            -1,
            -1,
            -1
        ]
        this.showPieces();
    }
    get name () {
        return this._name;
    }
    get pieces() {
        return this._pieces;
    }
    get color() {
        return this._color;
    }
    get home() {
        return this._home;
    }
    get finish() {
        return this._finish;
    }
    get start() {
        return this._start;
    }
    getPiecePosition(index) {
        if(this.pieces[index] < 0) {
            return document.querySelector(`.${this.color}.home.${numToString(index)}`);
        } else if(this.pieces[index] < 40) {
        return document.querySelector(`.${gameField[(this.start + this.pieces[index]) % 40]}.field`);
        } 
        return document.querySelector(`.${this.color}.finish.${numToString(this.pieces[index] % 40)}`);
    }
    showPiece(index) {
        if(index < 0 || index > 3) {
            console.log("Wrong Index: " + index);
            return false;
        }
        this.getPiecePosition(index).textContent = this.colorLetterCapitalized();
        return true;
    }
    
    showPieces() {
        for(let i = 0; i < this.pieces.length; i++) {
            this.getPiecePosition(i).textContent = this.colorLetterCapitalized()
        }
        return true;
    }
    colorLetterCapitalized() {
        return this._color.charAt(0).toUpperCase();
    }
    
    isAbleToMove() {
        const piecesInPlay = this.pieces.filter(piece => piece >= 0);
        for(let i = 43; i >= 40; i--) {
            if(piecesInPlay.length <= 0) {
                break;
            }
            if(piecesInPlay.some(piece => piece === i)) {
                piecesInPlay.splice(piecesInPlay.indexOf(i), 1);
                continue;
            }
            break;
        }
        return piecesInPlay.length === 0 ? 3 : 1;  
    }
    getIndex(PositionIndex) {
        return this.pieces.findIndex(piece => piece === PositionIndex);
    }
    movePiece(PositionIndex, diceNumber) {
        if(PositionIndex >= 0 && PositionIndex < 40) {
            PositionIndex -= this.start;
            if(PositionIndex < 0) PositionIndex += 40;
        } 
        const index = this.getIndex(PositionIndex);
        const piecePosition = this.getPiecePosition(index);
        if(index < 0) return false;
        if(this.pieces[index] === -1) {
            if(diceNumber != 6) {
                createMessage(1);
                console.log("Exit1");
                return false;
            }
            const startSquareContent = document.querySelector(`.${gameField[this.start]}.field`).textContent;
            if(startSquareContent === this.colorLetterCapitalized()) {
                createMessage(0);
                console.log("Exit2");
                return false;
            }
            piecePosition.textContent = '';
            this.pieces[index] = 0;
            this.showPiece(index);
            return startSquareContent.length > 0 ? startSquareContent : true;
            
        }
        if(this.pieces[index] + diceNumber > 43) {
            createMessage(2);
            console.log("Exit3");
            return false;
        }
        let GameFieldPositionNew = this.pieces[index] + diceNumber;
        let squareContent = '';
        if(GameFieldPositionNew < 40) {
            squareContent = document.querySelector(`.${gameField[(this.start + GameFieldPositionNew) % 40 ]}`).textContent;
        } else {
            GameFieldPositionNew = GameFieldPositionNew % 40;
            squareContent = document.querySelector(`.${this.color}.finish.${numToString(GameFieldPositionNew)}`).textContent;
        }
        if(squareContent === this.colorLetterCapitalized()) {
                createMessage(0);
                console.log("Exit4");
                return false;
        }
        piecePosition.textContent = '';
        this.pieces[index] += diceNumber;
        this.showPiece(index);
        console.log("Exit5");
        return squareContent.length > 0 ? squareContent : true;
    }
    movePieceHome(PositionIndex){
        if(PositionIndex != 0) {
            PositionIndex -= this.start;
            if(PositionIndex < 0) PositionIndex += 40;
        }
        const index = this.getIndex(PositionIndex);
        if(index < 0) return false;
        this.pieces[index] = -1;
        this.showPiece(index);
        return true;
    }
    hasWon() {
        return this.pieces.every(piece => piece > 39);
    }
};

const numbers = ['zero', 'one', 'two', 'three'];

function numToString(num) {
    if(typeof num === "string") {
        return num;
    }
    
    if(num < numbers.length) {
        return numbers[num];
    }
    return 'null';
}

function stringToNum(string) {
    if(typeof string === "number") {
        return string;
    }
    return numbers.findIndex(num => num === string);
}