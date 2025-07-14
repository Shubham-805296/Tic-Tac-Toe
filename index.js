let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    let scoreX = 0;
    let scoreO = 0;

    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.querySelector('.btn');
    const scoreXDisplay = document.getElementById('score-x');
    const scoreODisplay = document.getElementById('score-o');

 cells.forEach(cell => {
      cell.addEventListener('click', () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
      const index = parseInt(cell.id.split('-')[1]);

      if (board[index] !== '' || !gameActive) return;

      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      cell.style.color = currentPlayer === 'X' ? 'red' : 'gold';

      if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;

        if (currentPlayer === 'X') {
          scoreX++;
          scoreXDisplay.textContent = `Score: ${scoreX}`;
        } else {
          scoreO++;
          scoreODisplay.textContent = `Score: ${scoreO}`;
        }
        return;
      }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s Turn`;
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(i => board[i] === currentPlayer);
  });
}

restartBtn.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusDisplay.textContent = `It's ${currentPlayer}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = 'black';
  });
});
