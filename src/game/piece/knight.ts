import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';
import {Color, Piece} from './piece';

/**
 * A knight piece.
 */
export class Knight extends Piece {
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    super(game, color, coordinate);
  }

  getCandidateMoves(): Move[] {
    const moves: Move[] = [];
    const offsets: Coordinate[] = [
      {rank: -2, file: -1},
      {rank: -2, file: 1},
      {rank: -1, file: -2},
      {rank: -1, file: 2},
      {rank: 1, file: -2},
      {rank: 1, file: 2},
      {rank: 2, file: -1},
      {rank: 2, file: 1},
    ];
    for (const offset of offsets) {
      moves.push(
        new Move(this, this.coordinate, {
          rank: this.coordinate.rank + offset.rank,
          file: this.coordinate.file + offset.file,
        })
      );
    }
    return moves;
  }
}
