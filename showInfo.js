function getContent(content) {
    if(typeof content === 'number') {
        if(content > messages.length) {
            console.log("Index to high!");
            return false;
        }
        return messages[content];
    } else {
        return content;
    }
}

function showPlayerTurn(player) {
    if(!document.querySelector('.showPlayerTurn')) {
        document.getElementsByTagName("main")[0].
        prepend(Object.assign(document.createElement('p'), { className: 'showPlayerTurn' }));
    }
    const content = "Player:<br>" + player.name + "<br> color:<br>" + player.color;
    document.querySelector('.showPlayerTurn').innerHTML = content;
}

function showDiceThrow(diceNumber) {
    if(!document.querySelector('.showDiceNumber')) {
        document.getElementsByTagName("main")[0].
        appendChild(Object.assign(document.createElement('p'), { className: 'showDiceNumber' }));
    }
    document.querySelector('.showDiceNumber').innerHTML = "Dice: " + diceNumber;
}

function createMessage(content) {
    message = getContent(content);
    return new Promise((resolve) => {
    document.querySelector("body").
        appendChild(Object.assign(document.createElement('p'), { className: 'message', innerHTML: message }));
    setTimeout(() => {
        document.querySelector("body").removeChild(document.querySelector(".message"));
        resolve()
    }, currentSettings.speedSettings['gameSpeed']);
  });
}

const messages = [
    "Selected Square already occupied by you!",
    "You need a 6 to get out of your home!",
    "Piece can't be moved: Square outside of field"
]


