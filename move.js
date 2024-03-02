async function move(playerData, k) {
    let fail = false;
    const MoveNumber = playerData[k].isAbleToMove();
    await createMessage("You can throw the dice: " + MoveNumber + " times.");
    let diceNumber = 0;
    for (i = 0; i < MoveNumber; i++) {
        diceNumber = await throwDice();
        if (diceNumber === 6) {
            break;
        }        
    }
    if(MoveNumber === 3 && diceNumber != 6) {
        await createMessage("You can't move! Maybe next turn!");
        return true;
    }
    let ThrowNumber = 1;
    do {
        if(ThrowNumber > 1) diceNumber = await throwDice();
        await createMessage("Please select the piece you want to move");
        let selection = convertSelection(await waitForEvent());
        let result = playerData[k].movePiece(selection, diceNumber);
        if(result === true) {
            ThrowNumber++;
        } else if(result.length > 0) {
            const hitPlayer = playerData.findIndex(player => player.color === color[color.findIndex(item => item[0].toUpperCase() === result)]);
            if(selection === -1) selection = -diceNumber;
            console.log("Hit Player:" + hitPlayer);
            console.log(selection + diceNumber);
            if(!playerData[hitPlayer].movePieceHome((selection + diceNumber) % 40)) await createMessage("Error!");
        } else {
            diceNumber = 6;
        }
    } while(diceNumber === 6 && ThrowNumber <= 3);
    return true;
}