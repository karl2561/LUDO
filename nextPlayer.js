function nextPlayer(playerData, i) {
    i++;
    return i >= playerData.length ? 0 : i;
}