import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';
import {Color, Piece} from './piece';

export class Rook extends Piece {
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    super(game, color, coordinate);
  }

  getCandidateMoves(): Move[] {
    const moves: Move[] = [];

    for (const step of [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ]) {
      for (
        let to: Coordinate = {
          rank: this.coordinate.rank + step[0],
          file: this.coordinate.file + step[1],
        };
        this.game.isInBoard(to);
        to = {rank: to.rank + step[0], file: to.file + step[1]}
      ) {
        moves.push(new Move(this, this.coordinate, to));

        if (this.game.pieceAt(to) !== null) {
          // If there is a piece at the destination, limit piece movement in
          // the current direction to the current coordinate
          break;
        }
      }
    }
    return moves;
  }
}
