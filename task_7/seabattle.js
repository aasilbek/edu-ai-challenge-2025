const readline = require('readline');

// Constants
const BOARD_SIZE = 10;
const NUM_SHIPS = 3;
const SHIP_LENGTH = 3;
const CELL_STATES = {
  EMPTY: '~',
  SHIP: 'S',
  HIT: 'X',
  MISS: 'O'
};

// Game Board Class
class Board {
  constructor(size) {
    this.size = size;
    this.grid = Array(size).fill().map(() => Array(size).fill(CELL_STATES.EMPTY));
  }

  placeShip(ship) {
    ship.locations.forEach(({ row, col }) => {
      this.grid[row][col] = CELL_STATES.SHIP;
    });
  }

  markCell(row, col, state) {
    this.grid[row][col] = state;
  }

  getCell(row, col) {
    return this.grid[row][col];
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  toString(hideShips = false) {
    let result = '';
    for (let i = 0; i < this.size; i++) {
      result += i + ' ';
      for (let j = 0; j < this.size; j++) {
        const cell = this.grid[i][j];
        result += (hideShips && cell === CELL_STATES.SHIP ? CELL_STATES.EMPTY : cell) + ' ';
      }
      result += '\n';
    }
    return result;
  }
}

// Ship Class
class Ship {
  constructor(length) {
    this.length = length;
    this.locations = [];
    this.hits = Array(length).fill(false);
  }

  addLocation(row, col) {
    this.locations.push({ row, col });
  }

  isHit(row, col) {
    const index = this.locations.findIndex(loc => loc.row === row && loc.col === col);
    if (index !== -1) {
      this.hits[index] = true;
      return true;
    }
    return false;
  }

  isSunk() {
    return this.hits.every(hit => hit);
  }
}

// Player Class
class Player {
  constructor(name, board) {
    this.name = name;
    this.board = board;
    this.ships = [];
    this.guesses = new Set();
  }

  placeShips() {
    for (let i = 0; i < NUM_SHIPS; i++) {
      const ship = new Ship(SHIP_LENGTH);
      let placed = false;

      while (!placed) {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const startRow = Math.floor(Math.random() * (BOARD_SIZE - (orientation === 'vertical' ? SHIP_LENGTH : 0)));
        const startCol = Math.floor(Math.random() * (BOARD_SIZE - (orientation === 'horizontal' ? SHIP_LENGTH : 0)));

        if (this.canPlaceShip(ship, startRow, startCol, orientation)) {
          this.placeShip(ship, startRow, startCol, orientation);
          placed = true;
        }
      }
    }
  }

  canPlaceShip(ship, startRow, startCol, orientation) {
    for (let i = 0; i < SHIP_LENGTH; i++) {
      const row = orientation === 'horizontal' ? startRow : startRow + i;
      const col = orientation === 'horizontal' ? startCol + i : startCol;

      if (!this.board.isValidPosition(row, col) || 
          this.board.getCell(row, col) !== CELL_STATES.EMPTY) {
        return false;
      }
    }
    return true;
  }

  placeShip(ship, startRow, startCol, orientation) {
    for (let i = 0; i < SHIP_LENGTH; i++) {
      const row = orientation === 'horizontal' ? startRow : startRow + i;
      const col = orientation === 'horizontal' ? startCol + i : startCol;
      ship.addLocation(row, col);
    }
    this.ships.push(ship);
    this.board.placeShip(ship);
  }

  makeGuess(row, col) {
    const guessKey = `${row}${col}`;
    if (this.guesses.has(guessKey)) {
      return { valid: false, message: 'You already guessed that location!' };
    }

    if (!this.board.isValidPosition(row, col)) {
      return { 
        valid: false, 
        message: `Please enter valid coordinates between 0 and ${BOARD_SIZE - 1}.` 
      };
    }

    this.guesses.add(guessKey);
    return { valid: true };
  }

  receiveAttack(row, col) {
    for (const ship of this.ships) {
      if (ship.isHit(row, col)) {
        this.board.markCell(row, col, CELL_STATES.HIT);
        return { 
          hit: true, 
          sunk: ship.isSunk(),
          message: ship.isSunk() ? 'Ship sunk!' : 'Hit!' 
        };
      }
    }
    this.board.markCell(row, col, CELL_STATES.MISS);
    return { hit: false, message: 'Miss!' };
  }

  hasLost() {
    return this.ships.every(ship => ship.isSunk());
  }
}

// CPU Player Class
class CPUPlayer extends Player {
  constructor(board) {
    super('CPU', board);
    this.mode = 'hunt';
    this.targetQueue = [];
  }

  makeGuess() {
    let row, col;
    let validGuess = false;
    
    while (!validGuess) {
      if (this.mode === 'target' && this.targetQueue.length > 0) {
        const target = this.targetQueue.shift();
        row = target.row;
        col = target.col;
      } else {
        this.mode = 'hunt';
        row = Math.floor(Math.random() * BOARD_SIZE);
        col = Math.floor(Math.random() * BOARD_SIZE);
      }

      const guessKey = `${row}${col}`;
      if (!this.guesses.has(guessKey)) {
        this.guesses.add(guessKey);
        validGuess = true;
      }
    }

    return { row, col };
  }

  processHit(row, col) {
    this.mode = 'target';
    const adjacent = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 }
    ];

    adjacent.forEach(pos => {
      if (this.board.isValidPosition(pos.row, pos.col) && 
          !this.guesses.has(`${pos.row}${pos.col}`)) {
        this.targetQueue.push(pos);
      }
    });
  }
}

// Game Class
class Game {
  constructor() {
    this.playerBoard = new Board(BOARD_SIZE);
    this.cpuBoard = new Board(BOARD_SIZE);
    this.player = new Player('Player', this.playerBoard);
    this.cpu = new CPUPlayer(this.cpuBoard);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    console.log('Welcome to Sea Battle!');
    this.player.placeShips();
    this.cpu.placeShips();
    await this.gameLoop();
  }

  async gameLoop() {
    while (true) {
      this.printBoards();
      
      // Player's turn
      const playerGuess = await this.getPlayerGuess();
      const playerResult = this.cpu.receiveAttack(playerGuess.row, playerGuess.col);
      console.log(playerResult.message);
      
      if (this.cpu.hasLost()) {
        console.log('Congratulations! You won!');
        break;
      }

      // CPU's turn
      console.log("\nCPU's turn...");
      const cpuGuess = this.cpu.makeGuess();
      const cpuResult = this.player.receiveAttack(cpuGuess.row, cpuGuess.col);
      console.log(`CPU guessed ${cpuGuess.row}${cpuGuess.col}: ${cpuResult.message}`);
      
      if (cpuResult.hit) {
        this.cpu.processHit(cpuGuess.row, cpuGuess.col);
      }
      
      if (this.player.hasLost()) {
        console.log('Game Over! CPU won!');
        break;
      }
    }
    
    this.rl.close();
  }

  printBoards() {
    console.log('\n   --- OPPONENT BOARD ---          --- YOUR BOARD ---');
    let headerStr = '  ';
    for (let h = 0; h < BOARD_SIZE; h++) {
      headerStr += h + ' ';
    }
    console.log(headerStr + '     ' + headerStr);

    for (let i = 0; i < BOARD_SIZE; i++) {
      let rowStr = i + ' ';
      // Opponent board (hide ships)
      for (let j = 0; j < BOARD_SIZE; j++) {
        const cell = this.cpuBoard.grid[i][j];
        rowStr += (cell === CELL_STATES.SHIP ? CELL_STATES.EMPTY : cell) + ' ';
      }
      rowStr += '    ' + i + ' ';
      // Player board (show ships)
      for (let j = 0; j < BOARD_SIZE; j++) {
        rowStr += this.playerBoard.grid[i][j] + ' ';
      }
      console.log(rowStr);
    }
    console.log('\n');
  }

  getPlayerGuess() {
    return new Promise((resolve) => {
      this.rl.question('Enter your guess (e.g., 00, 34): ', (input) => {
        if (input.length !== 2) {
          console.log('Please enter exactly two digits.');
          return this.getPlayerGuess().then(resolve);
        }

        const row = parseInt(input[0]);
        const col = parseInt(input[1]);
        const result = this.player.makeGuess(row, col);

        if (!result.valid) {
          console.log(result.message);
          return this.getPlayerGuess().then(resolve);
        }

        resolve({ row, col });
      });
    });
  }
}

// Start the game
if (require.main === module) {
  const game = new Game();
  game.start();
}

module.exports = {
  Board,
  Ship,
  Player,
  CPUPlayer,
  Game,
  CELL_STATES
};