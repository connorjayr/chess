import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';
import {Color, Piece} from './piece';

/**
 * A queen piece.
 */
export class Queen extends Piece {
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    super(game, color, coordinate);
  }

  getCandidateMoves(): Move[] {
    return this.generateLinearMoves(
      {rank: -1, file: -1},
      {rank: -1, file: 0},
      {rank: -1, file: 1},
      {rank: 0, file: -1},
      {rank: 0, file: 1},
      {rank: 1, file: -1},
      {rank: 1, file: 0},
      {rank: 1, file: 1}
    );
  }
}
