/*
  script.js
  Full Tic‑Tac‑Toe game logic with dynamic board rendering, turn handling,
  win/draw detection, highlighting of the winning line, and restart functionality.
  Exposes key functions via `window.ticTacToe` for potential unit testing.
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants -----------------------------------------------------------
  const PLAYER_X = 'X';
  const PLAYER_O = 'O';
  const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // --- Mutable state -------------------------------------------------------
  let board = Array(9).fill(null); // tracks X/O values per cell
  let currentPlayer = PLAYER_X;    // whose turn it is
  let gameActive = true;           // false after win or draw

  // --- Cached DOM elements -------------------------------------------------
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');

  // Holds references to the generated cell elements
  const cells = [];

  // --- Helper: render board cells (Task 1) -------------------------------
  const renderBoard = () => {
    // Clear any existing markup (fallback cells from HTML)
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      boardEl.appendChild(cell);
      cells.push(cell);
    }
  };

  // --- Update status text (Task 3) ---------------------------------------
  const updateStatus = () => {
    // Called only when the game is still active – shows whose turn it is
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
    statusEl.className = '';
  };

  // --- Highlight winning cells (Task 5) -----------------------------------
  const highlightWinningCells = (combination) => {
    combination.forEach(idx => {
      const cell = cells[idx];
      if (cell) cell.classList.add('highlight');
    });
  };

  // --- Check for win/draw (Task 4) ---------------------------------------
  const checkResult = () => {
    // Win detection
    for (const combo of WIN_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameActive = false;
        highlightWinningCells(combo);
        statusEl.textContent = `${currentPlayer} wins!`;
        statusEl.classList.add('win');
        return;
      }
    }
    // Draw detection
    if (board.every(cell => cell !== null)) {
      gameActive = false;
      statusEl.textContent = 'Draw!';
      statusEl.classList.add('draw');
    }
  };

  // --- Cell click handler (Task 2) ----------------------------------------
  const handleCellClick = (event) => {
    const cell = event.target;
    const index = parseInt(cell.dataset.index, 10);
    if (!gameActive || board[index] !== null) return;

    // Update board state
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer === PLAYER_X ? 'x' : 'o');
    cell.textContent = currentPlayer; // optional visual aid

    // Evaluate result
    checkResult();

    // If still active, switch player and update status
    if (gameActive) {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      updateStatus();
    }
  };

  // --- Restart the game (Task 6) ------------------------------------------
  const restartGame = () => {
    // Reset mutable state
    board.fill(null);
    currentPlayer = PLAYER_X;
    gameActive = true;

    // Reset each cell's visual state
    cells.forEach(cell => {
      cell.className = 'cell'; // remove x/o/highlight classes
      cell.textContent = '';
    });

    // Clear win/draw styling from status element
    statusEl.classList.remove('win', 'draw');
    updateStatus();
  };

  // Attach restart button listener
  restartBtn.addEventListener('click', restartGame);

  // Initial render & status
  renderBoard();
  updateStatus();

  // Expose for testing / external access
  window.ticTacToe = {
    get board() { return board; },
    get currentPlayer() { return currentPlayer; },
    handleCellClick,
    restartGame,
    checkResult,
    PLAYER_X,
    PLAYER_O
  };
});
