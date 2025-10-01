// ========================================
// SOKOBAN GAME - Step 1: Render the Board
// ========================================

// Game state variables
let playerPosition = { row: 0, col: 0 };
let blocks = []; // Array of block positions: [{row, col}, ...]
let goals = [];  // Array of goal positions: [{row, col}, ...]
let gridElements = []; // 2D array to store references to HTML tile elements

// Get the game board container from HTML
const gameBoard = document.getElementById('game-board');
const gameInfo = document.getElementById('game-info');

// ========================================
// FUNCTION: Initialize the game
// ========================================
function initGame() {
    // Set up the CSS grid based on map dimensions
    gameBoard.style.gridTemplateColumns = `repeat(${tileMap01.width}, 40px)`;
    gameBoard.style.gridTemplateRows = `repeat(${tileMap01.height}, 40px)`;
    
    // Loop through each row in the map
    for (let row = 0; row < tileMap01.height; row++) {
        gridElements[row] = []; // Initialize this row in our grid array
        
        // Loop through each column in this row
        for (let col = 0; col < tileMap01.width; col++) {
            // Get the character at this position (it's in an array, so we take [0])
            const mapChar = tileMap01.mapGrid[row][col][0];
            
            // Create a div element for this tile
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            // Determine what type of tile this is and add the appropriate CSS class
            if (mapChar === 'W') {
                // Wall tile
                tile.classList.add(Tiles.Wall);
            } else if (mapChar === 'G') {
                // Goal tile
                tile.classList.add(Tiles.Goal);
                goals.push({ row: row, col: col }); // Remember goal positions
            } else {
                // Empty space (or will have player/block on it)
                tile.classList.add(Tiles.Space);
            }
            
            // Check if there's a player or block at this position
            if (mapChar === 'P') {
                // Player starting position
                playerPosition = { row: row, col: col };
                createEntity(tile, Entities.Character);
            } else if (mapChar === 'B') {
                // Block starting position
                blocks.push({ row: row, col: col });
                createEntity(tile, Entities.Block);
            }
            
            // Store reference to this tile element
            gridElements[row][col] = tile;
            
            // Add the tile to the game board
            gameBoard.appendChild(tile);
        }
    }
    
    // Display initial game info
    gameInfo.textContent = `Blocks remaining: ${blocks.length}`;
}

// ========================================
// FUNCTION: Create an entity (player or block) on a tile
// ========================================
function createEntity(tile, entityClass) {
    const entity = document.createElement('div');
    entity.classList.add('entity');
    entity.classList.add(entityClass);
    tile.appendChild(entity);
}

// ========================================
// START THE GAME when page loads
// ========================================
initGame();