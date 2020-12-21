import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {EnPassantMove} from '../move/en-passant-move';
import {Move} from '../move/move';
import {Color, Piece} from './piece';

export class Pawn extends Piece {
  constructor(game: Game, color: Color, coordinate: Coordinate) {
    super(game, color, coordinate);
  }

  getCandidateMoves(): Move[] {
    const moves: Move[] = [];

    // The direction that a pawn moves depends on its color
    const direction = {
      black: -1,
      white: 1,
    }[this.color];

    // Pawns may always move one square forward
    moves.push(
      new Move(this, this.coordinate, {
        rank: this.coordinate.rank + direction,
        file: this.coordinate.file,
      })
    );

    if (this.moveHistory.length === 0) {
      // If this pawn hasn't moved yet, then it may move two squares forward
      moves.push(
        new Move(this, this.coordinate, {
          rank: this.coordinate.rank + direction * 2,
          file: this.coordinate.file,
        })
      );
    }

    for (const fileOffset of [-1, 1]) {
      // Pawns may capture enemy pieces diagonally in either direction
      const to: Coordinate = {
        rank: this.coordinate.rank + direction,
        file: this.coordinate.file + fileOffset,
      };
      const diagonalPiece = this.game.pieceAt(to);
      if (diagonalPiece !== null && diagonalPiece.color !== this.color) {
        moves.push(new Move(this, this.coordinate, to));
      }

      // Pawns may capture enemy pawns using "en passant"
      const enemyPawn = this.game.pieceAt({
        rank: this.coordinate.rank,
        file: this.coordinate.file + fileOffset,
      });
      if (
        enemyPawn instanceof Pawn &&
        enemyPawn.color !== this.color &&
        this.game.lastMove()?.piece === enemyPawn
      ) {
        moves.push(new EnPassantMove(this, this.coordinate, to, enemyPawn));
      }
    }

    return moves;
  }
}
