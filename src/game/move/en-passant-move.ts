import {Coordinate} from '../coordinate';
import {Pawn} from '../piece/pawn';
import {Move} from './move';

export class EnPassantMove extends Move {
  enemyPawn: Pawn;

  constructor(pawn: Pawn, from: Coordinate, to: Coordinate, enemyPawn: Pawn) {
    super(pawn, from, to);
    this.enemyPawn = enemyPawn;
  }
}
