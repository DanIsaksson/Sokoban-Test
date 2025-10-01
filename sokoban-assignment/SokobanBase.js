
/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
    Wall: "tile-wall",
    Space: "tile-space",
    Goal: "tile-goal"
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
    Character: "entity-player",
    Block: "entity-block",
    BlockDone: "entity-block-goal"
};

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/
/*  tileMap01.mapGrid is a 2D array representation of a Sokoban level
    Each sub-array represents a row in the level, and each element in the sub-array represents a tile in that row
    The element values are strings, where:
        ' ' represents an empty space
        'W' represents a wall tile
        'B' represents a movable block
        'P' represents the player starting position
        'G' represents a goal area for the blocks
*/
var tileMap01 = {
    width: 19,
    height: 16,
    mapGrid: [
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], ['W'], ['B'], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], ['W'], ['W'], [' '], [' '], ['B'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], ['W'], [' '], [' '], ['B'], [' '], ['B'], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [['W'], ['W'], ['W'], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [['W'], [' '], [' '], [' '], ['W'], [' '], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], [' '], ['B'], [' '], [' '], ['B'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], ['G'], ['G'], ['W']],
    [['W'], ['W'], ['W'], ['W'], ['W'], [' '], ['W'], ['W'], ['W'], [' '], ['W'], ['P'], ['W'], ['W'], [' '], [' '], ['G'], ['G'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], [' '], [' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']],
    [[' '], [' '], [' '], [' '], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']],
    [[' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' '], [' ']]
    ]
};