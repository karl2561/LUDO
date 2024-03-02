async function throwDice() {
    await createMessage("Throwing the dice...!");
    const diceNumber = Math.ceil(Math.random() *6);
    await createMessage("You threw a " + diceNumber);
    showDiceThrow(diceNumber);
    return diceNumber;
}