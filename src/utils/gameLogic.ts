
// The target sequence that represents the student ID
export const TARGET_SEQUENCE = [8, 0, 1, 4, 1, 7, 4, 6];

/**
 * Creates a solvable shuffled board
 */
export function createShuffledBoard(): number[] {
  const board = [...TARGET_SEQUENCE];
  
  // Fisher-Yates shuffle algorithm
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
  
  // Make sure it's not already solved
  if (isBoardSolved(board)) {
    return createShuffledBoard(); // Recursively try again
  }
  
  return board;
}

/**
 * Swaps two tiles in the board
 */
export function swapTiles(board: number[], index1: number, index2: number): number[] {
  const newBoard = [...board];
  [newBoard[index1], newBoard[index2]] = [newBoard[index2], newBoard[index1]];
  return newBoard;
}

/**
 * Checks if the board is in the solved state
 */
export function isBoardSolved(board: number[]): boolean {
  return board.every((value, index) => value === TARGET_SEQUENCE[index]);
}

/**
 * Formats time in seconds to mm:ss format
 */
export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
