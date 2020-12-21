import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';

export type Color = 'black' | 'white';

/**
 * A generic chess piece.
 */
export abstract class Piece {
  game: Game;
  color: Color;
  coordinate: Coordinate;
  moveHistory: Move[];

  /**
   * Constructs a new piece.
   * @param game the game whose board contains this piece
   * @param color the color of this piece
   * @param coordinate the starting coordinate of this piece
   */
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    this.game = game;
    this.color = color;
    this.coordinate = coordinate;
    this.moveHistory = [];
  }

  /**
   * Returns an array of moves that this piece could make on the next turn. Some
   * of the moves may violate the rules of chess, such as putting the player's
   * own king in check or moving a piece off of the board.
   * @returns the candidate moves; i.e., moves which may violate the rules as
   * described above
   */
  abstract getCandidateMoves(): Move[];

  /**
   * Returns an array of legal moves that this piece can make on the next turn.
   * @returns the legal moves
   */
  getMoves(): Move[] {
    let candidateMoves = this.getCandidateMoves();

    // TODO: Fitler out any moves which put the king in check
    candidateMoves = candidateMoves.filter(() => true);

    return candidateMoves;
  }

  /**
   * Generates a list of moves that this piece could make by moving in straight
   * lines.
   * @param steps the directions of the lines
   * @returns the moves
   */
  protected generateLinearMoves(...steps: Coordinate[]): Move[] {
    const moves: Move[] = [];
    for (const step of steps) {
      for (
        let to: Coordinate = {
          rank: this.coordinate.rank + step.rank,
          file: this.coordinate.file + step.file,
        };
        this.game.isInBoard(to);
        to = {rank: to.rank + step.rank, file: to.file + step.file}
      ) {
        moves.push(new Move(this, this.coordinate, to));

        if (this.game.pieceAt(to) !== null) {
          // Prevent pieces from passing through a piece of any color
          break;
        }
      }
    }
    return moves;
  }
}
