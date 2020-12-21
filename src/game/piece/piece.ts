import {Coordinate} from '../coordinate';
import {Game} from '../game';
import {Move} from '../move/move';

export type Color = 'black' | 'white';

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

  abstract getCandidateMoves(): Move[];

  getMoves(): Move[] {
    let candidateMoves = this.getCandidateMoves();

    // TODO: Fitler out any moves which put the king in check
    candidateMoves = candidateMoves.filter(() => true);

    return candidateMoves;
  }
}
