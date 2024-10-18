"use strict";

let matches = 25;
let playerMatches = 0;
let computerMatches = 0;

const playerScore = document.getElementById("playerMatches");
const computerScore = document.getElementById("computerMatches");
const mainField = document.querySelector(".matches");
const pile = document.getElementById("pile");
const move = document.getElementById("move");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

const startGame = () => {
    const youButton = createButton("You", "Your move!");
    const computerButton = createButton("Computer", "Wait for opponent!");
    pile.style.width = "0";

    youButton.addEventListener("click", () => {
        computerButton.remove();
    });
    computerButton.addEventListener("click", () => {
        youButton.remove();
        setTimeout(computerMove, Math.random() * 10000);
    });

    move.textContent = 'Select the first to move';

    mainField.appendChild(youButton);
    mainField.appendChild(computerButton);
}

const createButton = (buttonText, labelText) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = buttonText;
    button.style.alignSelf = "center";
    button.addEventListener("click", () => {
        move.textContent = labelText;
        updateState();
        button.remove();
        pile.style.width = "80%";
    });
    return button;
}

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
        setTimeout(computerMove, Math.random() * 10000);
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

startGame()
clickButtons();
