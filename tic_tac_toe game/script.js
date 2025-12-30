const cells = document.querySelectorAll('.cell');
const overlay = document.getElementById('overlay');
const winnerText = document.getElementById('winnerText');
const restartBtn = document.getElementById('restartBtn');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if(gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  let roundWon = false;
  for (let combo of winningCombinations) {
    const [a,b,c] = combo;
    if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if(roundWon) {
    gameActive = false;
    winnerText.textContent = `🎉Player ${currentPlayer} Wins!🎉`;
    overlay.style.display = 'flex';
    launchConfetti();
    return;
  }

  if(!gameBoard.includes('')) {
    gameActive = false;
    winnerText.textContent = "It's a Draw!";
    overlay.style.display = 'flex';
  }
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  overlay.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

/* Confetti effect */
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff416c', '#ff4b2b', '#6a11cb', '#2575fc', '#fff']
  });
}
