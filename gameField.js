//Definition of GameField

const gameField = [
    "six",
    "seventeen",
    "twenty-eight",
    "thirty-nine",
    "fifty",
    "fifty-one",
    "fifty-two",
    "fifty-three",
    "fifty-four",
    "sixty-five",
    "seventy-six",
    "seventy-five",
    "seventy-four",
    "seventy-three",
    "seventy-two",
    "eighty-three",
    "ninety-four",
    "one-hundred-five",
    "one-hundred-sixteen",
    "one-hundred-fifteen",
    "one-hundred-fourteen",
    "one-hundred-three",
    "ninety-two",
    "eighty-one",
    "seventy",
    "sixty-nine",
    "sixty-eight",
    "sixty-seven",
    "sixty-six",
    "fifty-five",
    "forty-four",
    "forty-five",
    "forty-six",
    "forty-seven",
    "forty-eight",
    "thirty-seven",
    "twenty-six",
    "fifteen",
    "four",
    "five"     
];

const playingField = [];

function setNumber(i, j) {
    return setValue(2*i + j);
}

function setValue(value) {
    if (value < 0 || value > 120) {
        return 'null';
    }

    const words = [
        'zero', 'one', 'two', 'three', 'four', 'five',
        'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
        'twelve', 'thirteen', 'fourteen', 'fifteen',
        'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    const tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty',
        'sixty', 'seventy', 'eighty', 'ninety'
    ];

    if (value < 20) {
        return words[value];
    } else if (value < 100) {
        return tens[Math.floor(value / 10)] + (value % 10 !== 0 ? '-' + words[value % 10] : '');
    } else {
        return words[Math.floor(value / 100)] + '-hundred' + (value % 100 !== 0 ? '-' + setValue(value % 100) : '');
    }
}

for (let i = 0; i < 11; i++) {
    playingField.push([]);
    for (let j = 0; j < 11; j++) {
        let content = `${setValue(11*i + j)} `;
        if (i < 2 && j < 2) {
            content += `field yellow home ${setNumber(i, j)}`;
        } else if (i < 2 && j > 8) {
            const num = i + j - 7;
            content += `field green home ${setNumber(i, j - 9)}`;
        } else if (i > 8 && j < 2) {
            const num = i + j - 7;
            content += `field blue home ${setNumber(i - 9, j)}`;
        } else if (i > 8 && j > 8) {
            const num = i + j - 15;
            content += `field red home ${setNumber(i - 9, j - 9)}`;
        } else if (j === 5 && i > 0 && i < 5) {
            content += `field green finish ${setValue(i - 1)}`;
        } else if (j === 5 && i > 5 && i < 10) {
            content += `field blue finish ${setValue(9 - i)}`;
        } else if (i === 5 && j > 0 && j < 5) {
            content += `field yellow finish ${setValue(j - 1)}`;
        } else if (i === 5 && j > 5 && j < 10) {
            content += `field red finish ${setValue(9 - j)}`;
        } else if (i === 0 && j === 6) {
            content += "field green start";
        } else if (i === 4 && j === 0) {
            content += "field yellow start";
        } else if (i === 10 && j === 4) {
            content += "field blue start";
        } else if (i === 6 && j === 10) {
            content += "field red start";
        } else if ((i < 4 && j < 4) || (i < 4 && j > 6) || (i > 6 && j < 4) || (i > 6 && j > 6) || (i === 5 && j === 5)) {
            content += "empty";           
        } else {
            content += "field";
        }
        
        playingField[i].push(content);
    
    }
}


function displayGameBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < playingField.length; i++) {
        const tableRow = document.createElement('tr');
        tableRow.className = `${setValue(i)} row`;
        
        for (let j = 0; j < playingField[i].length; j++) {
            const boxElement = document.createElement('td');
            boxElement.className = playingField[i][j];
            tableRow.appendChild(boxElement);
            gameBoard.appendChild(tableRow);
        }
    }
}