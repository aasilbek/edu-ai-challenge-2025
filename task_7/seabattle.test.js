const { Board, Ship, Player, CPUPlayer, Game, CELL_STATES } = require('./seabattle');

describe('Board', () => {
  let board;

  beforeEach(() => {
    board = new Board(10);
  });

  test('should create an empty board', () => {
    expect(board.grid.length).toBe(10);
    expect(board.grid[0].length).toBe(10);
    expect(board.grid[0][0]).toBe(CELL_STATES.EMPTY);
  });

  test('should mark cell correctly', () => {
    board.markCell(0, 0, CELL_STATES.HIT);
    expect(board.getCell(0, 0)).toBe(CELL_STATES.HIT);
  });

  test('should validate positions correctly', () => {
    expect(board.isValidPosition(0, 0)).toBe(true);
    expect(board.isValidPosition(9, 9)).toBe(true);
    expect(board.isValidPosition(-1, 0)).toBe(false);
    expect(board.isValidPosition(0, 10)).toBe(false);
  });
});

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('should create a ship with correct length', () => {
    expect(ship.length).toBe(3);
    expect(ship.locations.length).toBe(0);
    expect(ship.hits.length).toBe(3);
  });

  test('should add locations correctly', () => {
    ship.addLocation(0, 0);
    ship.addLocation(0, 1);
    ship.addLocation(0, 2);
    expect(ship.locations).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 }
    ]);
  });

  test('should track hits correctly', () => {
    ship.addLocation(0, 0);
    ship.addLocation(0, 1);
    ship.addLocation(0, 2);
    
    expect(ship.isHit(0, 0)).toBe(true);
    expect(ship.isHit(0, 1)).toBe(true);
    expect(ship.isHit(0, 2)).toBe(true);
    expect(ship.isHit(1, 0)).toBe(false);
  });

  test('should detect when ship is sunk', () => {
    ship.addLocation(0, 0);
    ship.addLocation(0, 1);
    ship.addLocation(0, 2);
    
    ship.isHit(0, 0);
    ship.isHit(0, 1);
    ship.isHit(0, 2);
    
    expect(ship.isSunk()).toBe(true);
  });
});

describe('Player', () => {
  let player;
  let board;

  beforeEach(() => {
    board = new Board(10);
    player = new Player('Test Player', board);
  });

  test('should create a player with correct initial state', () => {
    expect(player.name).toBe('Test Player');
    expect(player.ships.length).toBe(0);
    expect(player.guesses.size).toBe(0);
  });

  test('should place ships correctly', () => {
    player.placeShips();
    expect(player.ships.length).toBe(3);
  });

  test('should validate guesses correctly', () => {
    const result = player.makeGuess(0, 0);
    expect(result.valid).toBe(true);
    expect(player.guesses.has('00')).toBe(true);

    const invalidResult = player.makeGuess(0, 0);
    expect(invalidResult.valid).toBe(false);
  });

  test('should handle attacks correctly', () => {
    const ship = new Ship(3);
    ship.addLocation(0, 0);
    ship.addLocation(0, 1);
    ship.addLocation(0, 2);
    player.ships.push(ship);
    board.placeShip(ship);

    const hitResult = player.receiveAttack(0, 0);
    expect(hitResult.hit).toBe(true);
    expect(hitResult.sunk).toBe(false);

    const missResult = player.receiveAttack(1, 1);
    expect(missResult.hit).toBe(false);
  });
});

describe('CPUPlayer', () => {
  let cpu;
  let board;

  beforeEach(() => {
    board = new Board(10);
    cpu = new CPUPlayer(board);
  });

  test('should create CPU player with correct initial state', () => {
    expect(cpu.name).toBe('CPU');
    expect(cpu.mode).toBe('hunt');
    expect(cpu.targetQueue.length).toBe(0);
  });

  test('should make valid guesses', () => {
    const guess = cpu.makeGuess();
    expect(guess).toHaveProperty('row');
    expect(guess).toHaveProperty('col');
    expect(guess.row).toBeGreaterThanOrEqual(0);
    expect(guess.row).toBeLessThan(10);
    expect(guess.col).toBeGreaterThanOrEqual(0);
    expect(guess.col).toBeLessThan(10);
  });

  test('should switch to target mode after hit', () => {
    cpu.processHit(5, 5);
    expect(cpu.mode).toBe('target');
    expect(cpu.targetQueue.length).toBeGreaterThan(0);
  });
});

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test('should create game with correct initial state', () => {
    expect(game.playerBoard).toBeInstanceOf(Board);
    expect(game.cpuBoard).toBeInstanceOf(Board);
    expect(game.player).toBeInstanceOf(Player);
    expect(game.cpu).toBeInstanceOf(CPUPlayer);
  });

  test('should initialize boards correctly', () => {
    expect(game.playerBoard.size).toBe(10);
    expect(game.cpuBoard.size).toBe(10);
  });
}); 