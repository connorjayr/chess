import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';
import {Color, Piece} from './piece';

export class Knight extends Piece {
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    super(game, color, coordinate);
  }

  getCandidateMoves(): Move[] {
    const moves: Move[] = [];
    const rankOffsets = [2, 1, -1, -2, -2, -1, 1, 2];
    const fileOffsets = [1, 2, 2, 1, -1, -2, -2, -1];
    for (let i = 0; i < 8; ++i) {
      const to: Coordinate = {
        rank: this.coordinate.rank + rankOffsets[i],
        file: this.coordinate.file + fileOffsets[i],
      };
      if (this.game.isInBoard(to)) {
        moves.push(new Move(this, this.coordinate, to));
      }
    }
    return moves;
  }
}
