async function game(playerData, i = 0, j = 0) {
    showPlayerTurn(playerData[i]);
    if(j >= 1000 || playerData[i].hasWon()) {
        console.log("Game over");
        return playerData[i];
    }
    await move(playerData, i);
    return game(playerData, nextPlayer(playerData, i), j + 1);
}