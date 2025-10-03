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
// FUNCTION: Get what's at a specific position
// ========================================
function getMapChar(row, col) {
    // Check if position is out of bounds
    if (row < 0 || row >= tileMap01.height || col < 0 || col >= tileMap01.width) {
        return 'W'; // Treat out of bounds as wall
    }
    return tileMap01.mapGrid[row][col][0];
}

// ========================================
// FUNCTION: Check if there's a block at a position
// ========================================
function isBlockAt(row, col) {
    // Loop through all blocks to see if any match this position
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].row === row && blocks[i].col === col) {
            return i; // Return the index of the block
        }
    }
    return -1; // No block found
}

// ========================================
// FUNCTION: Move the player in a direction
// ========================================
function movePlayer(rowDelta, colDelta) {
    // Calculate new position
    const newRow = playerPosition.row + rowDelta;
    const newCol = playerPosition.col + colDelta;
    
    // Check what's at the new position
    const targetChar = getMapChar(newRow, newCol);
    
    // COLLISION: Can't move into walls
    if (targetChar === 'W') {
        return; // Stop here, can't move
    }
    
    // Check if there's a block at the new position
    const blockIndex = isBlockAt(newRow, newCol);
    if (blockIndex !== -1) {
        // Try to push the block in the same direction
        const pushSucceeded = pushBlock(blockIndex, rowDelta, colDelta);
        if (!pushSucceeded) {
            return; // Can't push the block, so can't move
        }
        // Block was pushed successfully, continue with player movement below
    }
    
    // Movement is valid! Update player position
    // Remove player from old tile
    const oldTile = gridElements[playerPosition.row][playerPosition.col];
    const oldPlayer = oldTile.querySelector('.entity-player');
    if (oldPlayer) {
        oldPlayer.remove();
    }
    
    // Update position
    playerPosition.row = newRow;
    playerPosition.col = newCol;
    
    // Add player to new tile
    const newTile = gridElements[newRow][newCol];
    createEntity(newTile, Entities.Character);
}

// ========================================
// FUNCTION: Handle keyboard input
// ========================================
function handleKeyPress(event) {
    // Prevent default arrow key behavior (scrolling the page)
    if (event.key.startsWith('Arrow')) {
        event.preventDefault();
    }
    
    // Move based on which arrow key was pressed
    switch(event.key) {
        case 'ArrowUp':
            movePlayer(-1, 0); // Move up (row - 1)
            break;
        case 'ArrowDown':
            movePlayer(1, 0); // Move down (row + 1)
            break;
        case 'ArrowLeft':
            movePlayer(0, -1); // Move left (col - 1)
            break;
        case 'ArrowRight':
            movePlayer(0, 1); // Move right (col + 1)
            break;
    }
}

// ========================================
// FUNCTION: Check if a position is a goal
// ========================================
function isGoalAt(row, col) {
    // Loop through all goals to see if any match this position
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].row === row && goals[i].col === col) {
            return true;
        }
    }
    return false;
}

// ========================================
// FUNCTION: Push a block in a direction
// ========================================
function pushBlock(blockIndex, rowDelta, colDelta) {
    // Get current block position
    const block = blocks[blockIndex];
    
    // Calculate where the block would move to
    const newBlockRow = block.row + rowDelta;
    const newBlockCol = block.col + colDelta;
    
    // Check if the new position is valid
    const targetChar = getMapChar(newBlockRow, newBlockCol);
    
    // Can't push block into a wall
    if (targetChar === 'W') {
        return false; // Push failed
    }
    
    // Can't push block into another block
    if (isBlockAt(newBlockRow, newBlockCol) !== -1) {
        return false; // Push failed
    }
    
    // Push is valid! Move the block
    // Remove block from old tile
    const oldTile = gridElements[block.row][block.col];
    const oldBlock = oldTile.querySelector('.entity-block, .entity-block-goal');
    if (oldBlock) {
        oldBlock.remove();
    }
    
    // Update block position in the array
    blocks[blockIndex].row = newBlockRow;
    blocks[blockIndex].col = newBlockCol;
    
    // Add block to new tile
    const newTile = gridElements[newBlockRow][newBlockCol];
    
    // Check if the block is now on a goal - use different CSS class
    if (isGoalAt(newBlockRow, newBlockCol)) {
        createEntity(newTile, Entities.BlockDone); // Black block with green border
    } else {
        createEntity(newTile, Entities.Block); // Regular grey block
    }
    
    // Check if the player has won after this push
    checkWinCondition();
    
    return true; // Push succeeded
}

// ========================================
// FUNCTION: Check if the player has won
// ========================================
function checkWinCondition() {
    // Count how many blocks are on goal positions
    let blocksOnGoals = 0;
    
    // Loop through all blocks
    for (let i = 0; i < blocks.length; i++) {
        // Check if this block is on a goal
        if (isGoalAt(blocks[i].row, blocks[i].col)) {
            blocksOnGoals++;
        }
    }
    
    // If all blocks are on goals, the player wins!
    if (blocksOnGoals === blocks.length) {
        gameInfo.textContent = '🎉 YOU WIN! All blocks are on goals! 🎉';
        gameInfo.style.color = '#00ff00'; // Green text
        return true;
    } else {
        // Update the display with how many blocks are left
        const remaining = blocks.length - blocksOnGoals;
        gameInfo.textContent = `Blocks remaining: ${remaining}`;
        gameInfo.style.color = 'white';
        return false;
    }
}

// ========================================
// START THE GAME when page loads
// ========================================
initGame();

// Listen for keyboard input
document.addEventListener('keydown', handleKeyPress);