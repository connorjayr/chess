import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';
import {Color, Piece} from './piece';

/**
 * A king piece.
 */
export class King extends Piece {
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    super(game, color, coordinate);
  }

  getCandidateMoves(): Move[] {
    const moves: Move[] = [];
    for (let rankOffset = -1; rankOffset <= 1; ++rankOffset) {
      for (let fileOffset = -1; fileOffset <= 1; ++fileOffset) {
        const to: Coordinate = {
          rank: this.coordinate.rank + rankOffset,
          file: this.coordinate.file + fileOffset,
        };
        if (rankOffset === 0 && fileOffset === 0) {
          // Prevent the king from moving to the square that it's already on
          continue;
        }
        moves.push(new Move(this, this.coordinate, to));
      }
    }

    // TODO: Castling with king's side and queen's side rooks

    return moves;
  }
}
