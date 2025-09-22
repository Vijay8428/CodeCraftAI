# TicTacToeWebApp

A simple, interactive Tic‑Tac‑Toe web application that runs entirely in the browser. Players can click on the grid to make moves, see whose turn it is, receive win/draw notifications, and restart the game at any time.

---

## Features

- Two‑player gameplay on a 3×3 grid.
- Turn indicator showing the current player (X or O).
- Automatic detection of win conditions and draws.
- Real‑time display of win/draw messages.
- Restart button to reset the board and start a new game.
- Responsive layout using pure HTML, CSS, and JavaScript (no external libraries or build steps).

---

## Tech Stack

- **HTML** – Structure of the page and the game board.
- **CSS** – Styling for the board, cells, turn indicator, messages, and button.
- **JavaScript** – Game logic, event handling, state management, and UI updates.

---

## Installation / Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Open the application**
   - Locate `index.html` in the project root.
   - Open it directly in a web browser (Chrome, Firefox, Edge, etc.).
   - No additional build steps, package managers, or server configuration are required.

---

## Usage

1. Click on an empty cell to place your mark (X goes first).
2. The turn indicator updates to show which player’s move is next.
3. The game automatically checks for a win or a draw after each move:
   - If a player gets three in a row (horizontal, vertical, or diagonal), a win message appears.
   - If all cells are filled without a winner, a draw message appears.
4. Click the **Restart** button to clear the board and start a new game.

*Optional:* Include screenshots here to illustrate the UI.

---

## Code Structure

- **`index.html`** – Contains the markup for the game board, turn indicator, result message, and restart button.
- **`style.css`** – Provides styling for the layout, grid cells, hover effects, and responsive design.
- **`script.js`** – Implements the game logic:
  - Handles cell clicks, updates the board state, toggles turns.
  - Checks for win/draw conditions.
  - Updates UI elements (turn indicator, result message).
  - Resets the game when the restart button is pressed.

---

## Development Notes

### Main Functions in `script.js`

- **`handleCellClick(event)`** – Triggered when a cell is clicked. Determines the cell index, updates the board array, renders the move, checks for a result, and switches the active player.
- **`checkResult()`** – Evaluates the current board for any winning combination or a full board (draw). Returns an object indicating the status (`win`, `draw`, or `ongoing`).
- **`updateTurnIndicator()`** – Updates the on‑screen text to reflect whose turn it is.
- **`displayResult(message)`** – Shows a win or draw message to the players.
- **`restartGame()`** – Clears the board array, resets UI elements, and prepares the game for a fresh start.
- **`init()`** – Sets up event listeners for cells and the restart button, and initializes the first turn.

These functions work together to keep the UI in sync with the game state and ensure a smooth player experience.

---

## License

[Insert license information here]
