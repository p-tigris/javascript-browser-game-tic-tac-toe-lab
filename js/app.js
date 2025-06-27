//1) Define the required variables used to track the state of the game.
let board;
let turn;
let winner;
let tie;

//2) Store cached element references.
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const ticTacToeBoard = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')


//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.
function init() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = 'X';
    winner = false;
    tie = false; 
    squareEls.forEach((square) => {
        square.style.backgroundColor = '';
        square.style.color = ''
    })
    render();
}

document.addEventListener('DOMContentLoaded', init);

//4) The state of the game should be rendered to the user.
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

//5) Define the required constants.
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

//6) Handle a player clicking a square with a `handleClick` function.
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

ticTacToeBoard.addEventListener('click', handleClick)

const placePiece = (index) => {
    board[index] = turn;
}

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
            squareEls.forEach((square) => {
                square.style.border.color = 'gold' 
            })
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
//7) Create Reset functionality.
resetBtnEl.addEventListener('click', init)

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