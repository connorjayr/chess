import {assert} from 'console';
import {Coordinate} from './coordinate';
import {Move} from './move/move';
import {Bishop} from './piece/bishop';
import {King} from './piece/king';
import {Knight} from './piece/knight';
import {Pawn} from './piece/pawn';
import {Color, Piece} from './piece/piece';
import {Queen} from './piece/queen';
import {Rook} from './piece/rook';

/**
 * The size of the game board.
 */
export const SIZE = 8;

/**
 * A chess game.
 */
export class Game {
  board: (Piece | null)[][];
  piecesByColor: {[color in Color]: Piece[]};
  moveHistory: Move[];

  /**
   * Constructs a new game.
   */
  constructor() {
    this.board = [];
    for (let rank = 0; rank < SIZE; ++rank) {
      this.board.push(Array(SIZE).fill(null));
    }
    this.piecesByColor = {
      black: [],
      white: [],
    };
    this.populateBoard();

    this.moveHistory = [];
  }

  /**
   * Returns the last move made by either player, or undefined if no moves have
   * been made yet.
   * @returns the last move made by either player, or undefined if no moves have
   * been made yet
   */
  lastMove(): Move | undefined {
    if (this.moveHistory.length === 0) {
      return undefined;
    }
    return this.moveHistory[this.moveHistory.length - 1];
  }

  /**
   * Returns the piece at a given coordinate, or null if there is no piece at
   * that coordinate. If the coordinate is not within the bounds of the board,
   * then null is returned.
   * @param coordinate the coordinate
   * @returns the piece at `coordinate`, or null if there is no piece at
   * `coordinate`
   */
  pieceAt(coordinate: Coordinate): Piece | null {
    if (!this.isInBoard(coordinate)) {
      // If the coordinate is not within the board, then return null
      return null;
    }
    // Otherwise, return the piece on the board
    return this.board[coordinate.rank][coordinate.file];
  }

  /**
   * Returns whether or not the given coordinate is within the bounds of the
   * board.
   * @param coordinate the coordinate
   * @returns true if `coordinate` is in the board, false otherwise
   */
  isInBoard(coordinate: Coordinate): boolean {
    return (
      coordinate.rank >= 0 &&
      coordinate.rank < SIZE &&
      coordinate.file >= 0 &&
      coordinate.file < SIZE
    );
  }

  /**
   * Populates the board with pieces before the game is started.
   */
  private populateBoard() {
    for (let file = 0; file < 8; ++file) {
      // Place pawns onto the board
      this.board[1][file] = new Pawn(this, 'white', {rank: 1, file: file});
      this.board[SIZE - 2][file] = new Pawn(this, 'black', {
        rank: SIZE - 2,
        file: file,
      });

      // Place other pieces onto the board
      const distanceFromEdge = Math.min(file, SIZE - file - 1);
      if (distanceFromEdge === 0) {
        // Rooks are 0 squares from the edge of the board
        this.board[0][file] = new Rook(this, 'black', {rank: 0, file: file});
        this.board[SIZE - 1][file] = new Rook(this, 'black', {
          rank: SIZE - 1,
          file: file,
        });
      } else if (distanceFromEdge === 1) {
        // Knights are 1 square from the edge of the board
        this.board[0][file] = new Knight(this, 'black', {rank: 0, file: file});
        this.board[SIZE - 1][file] = new Knight(this, 'black', {
          rank: SIZE - 1,
          file: file,
        });
      } else if (distanceFromEdge === 2) {
        // Bishops are 2 squares from the edge of the board
        this.board[0][file] = new Bishop(this, 'black', {rank: 0, file: file});
        this.board[SIZE - 1][file] = new Bishop(this, 'black', {
          rank: SIZE - 1,
          file: file,
        });
      } else {
        // The king and queen are 3 squares from the edge of the board
        if (file === 3) {
          this.board[0][file] = new Queen(this, 'black', {rank: 0, file: file});
          this.board[SIZE - 1][file] = new Queen(this, 'black', {
            rank: SIZE - 1,
            file: file,
          });
        } else {
          assert(file === 4);
          this.board[0][file] = new King(this, 'black', {rank: 0, file: file});
          this.board[SIZE - 1][file] = new King(this, 'black', {
            rank: SIZE - 1,
            file: file,
          });
        }
      }
    }
  }
}
