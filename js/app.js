/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*-------------------------------- Variables --------------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const ticTacToeBoard = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = 'X';
    winner = false;
    tie = false; 
    squareEls.forEach((square) => {
        square.style.backgroundColor = '';
        square.style.color = ''
        square.style.borderColor = '';
    })
    render();
}

function render() {
    updateBoard()
    updateMessage()
}

const updateBoard = () => {
    board.forEach((square, index) => {
        squareEls[index].textContent = square;
    })
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It is ${turn}'s turn`
    } else if (tie === true) {
        messageEl.textContent = "It's a tie!"
    } else if (winner === true) {
        messageEl.textContent = `${turn} has won!`
    }
}

const handleClick = (event) => {
    const squareIndex = event.target.id;
    if (event.target.textContent === 'X' || event.target.textContent === 'O' || winner || !event.target.classList.contains('sqr')) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

const placePiece = (index) => {
    board[index] = turn;
}

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
            for (let i = 0; i < combo.length; i++) {
                document.getElementById(combo[i]).style.borderColor = '#FFD700'; /* Creates a gold border around the winning squares */ 
            }
        }
    })
}

const checkForTie = () => {
    if (winner) {
        return;
    } else if (!board.includes('')) {
        tie = true;
    }
}

const switchPlayerTurn = () => {
    if (winner) {
        return;
    } else {
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
    }
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', init);
ticTacToeBoard.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)

// Just to add a little color to the board
squareEls.forEach((square) => {
    square.addEventListener('click', () => {
        if (winner || square.textContent === 'X' || square.textContent === 'O') {
            return;
        }
        if (turn === 'X') {
            square.style.backgroundColor = '#800020';
            square.style.color = '#F8DEFF';
        } else {
            square.style.backgroundColor = '#000080';
            square.style.color = '#FDBE02';
        }
    })
})