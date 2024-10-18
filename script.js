"use strict";

let matches = 25;
let playerMatches = 0;
let computerMatches = 0;

const playerScore = document.getElementById("playerMatches");
const computerScore = document.getElementById("computerMatches");
const pile = document.getElementById("pile");
const move = document.getElementById("move");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

const updateState = () => {
    pile.textContent = '🔥'.repeat(matches);
    if (matches === 0) {
        const winner = playerMatches % 2 === 0 ? 'YOU' : 'COMPUTER';
        pile.textContent = `GAME OVER! ${winner} WON!`;
    }

};

const makeMove = (count) => {
    if (matches < count) return;
    matches -= count;
    playerMatches += count;
    playerScore.innerText = 'Player matches: ' + playerMatches;
    move.innerText = 'Wait for opponent!';
    updateState();

    if (matches > 0) {
        setTimeout(computerMove, 1000)
    }
};

const computerMove = () => {
    const optimalNumber = calculateOptimalNumber();
    matches -= optimalNumber;
    computerMatches += optimalNumber;
    computerScore.innerText = 'Computer matches: ' + computerMatches;
    move.innerText = 'Your move!';
    updateState();
};

const calculateOptimalNumber = () => {
    const optimalNumber = matches % 4;
    return optimalNumber === 0 ? 1 : optimalNumber;
};

const clickButtons = () => {
    btn1.addEventListener("click", () => {
        makeMove(1);
    });
    btn2.addEventListener("click", () => {
        makeMove(2);
    });
    btn3.addEventListener("click", () => {
        makeMove(3);
    });
}

updateState();
clickButtons();
