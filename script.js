"use strict";

let matches = 25;
let playerMatches = 0;
let computerMatches = 0;
let m;

const playerScore = document.getElementById("playerMatches");
const computerScore = document.getElementById("computerMatches");
const mainField = document.querySelector(".matches");
const pile = document.getElementById("pile");
const move = document.getElementById("move");
const buttons = document.querySelector(".buttons");

const adjustParameters = () => {
    const inputs = document.querySelector(".inputs");
    const nInput = document.getElementById("n");
    const mInput = document.getElementById("m");
    const submitBtn = document.getElementById("submit");
    pile.style.width = "0";
    move.textContent = "Getting ready!"
    submitBtn.addEventListener("click", () => {
        const n = nInput.value;
        m = mInput.value;
        if (!n || !m || n <= 0 || m <= 0) {
            alert("Enter valid n and m");
            return;
        }
        matches = 2 * n + 1;
        inputs.remove();
        submitBtn.remove();
        determineFirstMove();
    });
};

const determineFirstMove = () => {
    const youButton = createButton("You", "Your move!");
    const computerButton = createButton("Computer", "Wait for opponent!");
    pile.style.width = "0";

    youButton.addEventListener("click", () => {
        computerButton.remove();
        createButtons();
    });
    computerButton.addEventListener("click", () => {
        youButton.remove();
        createButtons();
        setTimeout(computerMove, Math.random() * 1000);
    });

    move.textContent = 'Select the first to move';
    mainField.appendChild(youButton);
    mainField.appendChild(computerButton);
};

const createButton = (buttonText, labelText, count) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = buttonText;
    button.style.alignSelf = "center";
    button.addEventListener("click", () => {
        if (labelText) {
            move.textContent = labelText;
            button.remove();
            updateState();
            pile.style.width = "80%";
        } else if (count) {
            makeMove(count);
        } else {
            button.remove();
            window.location.reload();
            adjustParameters();
        }
    });
    return button;
};

const createButtons = () => {
    const buttons = document.querySelector(".buttons");
    for (let i = 1; i <= m; i++) {
        const moveButton = createButton(`Take ${i} 🔥`, null, i);
        buttons.appendChild(moveButton);
    }
}

const updateState = () => {
    pile.textContent = '🔥'.repeat(matches);
    if (matches === 0) {
        gameOver();
    }
};

const gameOver = () => {
    const buttonsArray = Array.from(buttons.children);
    let winner;

    if (playerMatches % 2 === 0) {
        winner = "YOU";
        pile.style.background = "#d27c28";
    } else {
        winner = "COMPUTER";
        pile.style.background = "#ff0000";
    }
    pile.textContent = `GAME OVER! ${winner} WON!`;
    pile.style.boxShadow = "5px 5px 5px #2d1546";
    move.textContent = "Wanna play again?";

    for (const child of buttonsArray) {
        console.log(child, buttons.children);
        child.remove();
    }
    const positiveButton = createButton("Play again!", null, null);
    buttons.appendChild(positiveButton);
}

const makeMove = (count) => {
    if (matches < count) return;
    matches -= count;
    playerMatches += count;
    playerScore.innerText = 'Player matches: ' + playerMatches;
    move.innerText = 'Wait for opponent!';
    updateState();
    if (matches > 0) {
        setTimeout(computerMove, Math.random() * 1000);
    }
};

const computerMove = () => {
    const optimalNumber = calculateOptimalNumber(m);
    matches -= optimalNumber;
    computerMatches += optimalNumber;
    computerScore.innerText = 'Computer matches: ' + computerMatches;
    move.innerText = 'Your move!';
    updateState();
};

const calculateOptimalNumber = (m) => {
    const optimalNumber = matches % (+m + 1);
    return optimalNumber === 0 ? 1 : optimalNumber;
};

adjustParameters();
