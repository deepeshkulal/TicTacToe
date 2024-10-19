const grid = document.getElementById('grid');
const statusDisplay = document.getElementById('status');
const startGameButton = document.getElementById('start-game');
const player1SymbolSelect = document.getElementById('player1-symbol');
let currentPlayer, player1Symbol, player2Symbol;
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    gameActive = true;
    currentPlayer = "Player 1";
    player1Symbol = player1SymbolSelect.value;
    player2Symbol = player1Symbol === "X" ? "O" : "X";
    gameState.fill("");
    statusDisplay.innerHTML = `${currentPlayer}'s turn`;
    grid.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("cell-X", "cell-O");
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer === "Player 1" ? player1Symbol : player2Symbol;
    clickedCell.innerHTML = gameState[clickedCellIndex];
    clickedCell.classList.add(`cell-${gameState[clickedCellIndex]}`);

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    statusDisplay.innerHTML = `${currentPlayer}'s turn`;
}

startGameButton.addEventListener('click', startGame);
grid.addEventListener('click', handleCellClick);
