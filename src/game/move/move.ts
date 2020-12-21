import {Coordinate} from '../coordinate';
import {Piece} from '../piece/piece';

export class Move {
  piece: Piece;
  from: Coordinate;
  to: Coordinate;

  /**
   * Constructs a new move.
   * @param piece the piece that is moving
   * @param from the coordinate from which this piece is moving
   * @param to the coordinate to which this piece is moving
   */
  constructor(piece: Piece, from: Coordinate, to: Coordinate) {
    this.piece = piece;
    this.from = from;
    this.to = to;
  }
}
