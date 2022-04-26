import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-main-outer',
  templateUrl: './main-outer.component.html',
  styleUrls: ['./main-outer.component.scss'],
})
export class MainOuterComponent implements OnInit {
  @ViewChild('board1', { static: false })
  board1!: NgxChessBoardView;
  @ViewChild('board2', { static: false })
  board2!: NgxChessBoardView;

  isPlayerOnesTurn = true;
  isPlayerTwosTurn = false;

  // isFirstMove = true;
  isGameFinished = false;
  endgameMessage = '';

  constructor(private ngxChessBoardService: NgxChessBoardService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.board1.reset();
    // this.board2.reset();
    this.board2?.reverse();
  }

  switchPlayerTurn() {
    this.isPlayerOnesTurn = !this.isPlayerOnesTurn;
    this.isPlayerTwosTurn = !this.isPlayerTwosTurn;
  }

  playerOneMoveCompleted(event: any) {
    // console.log('player one move completed:', event);

    // copy board1 to board2 and reverse
    this.board2?.setFEN(this.board1?.getFEN());
    this.board2.reverse();

    if (event.checkmate) {
      this.endgameMessage = 'Player One Won!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    if (event.stalement) {
      this.endgameMessage = 'Stalemate!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    // switch turn to player two
    this.switchPlayerTurn();
  }

  playerTwoMoveCompleted(event: any) {
    // console.log('player two move completed:', event);

    // copy board2 to board1
    this.board1.setFEN(this.board2.getFEN());

    if (event.checkmate) {
      this.endgameMessage = 'Player Two Won!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    if (event.stalement) {
      this.endgameMessage = 'Stalemate!';
      this.isGameFinished = true;
      this.isPlayerOnesTurn = false;
      this.isPlayerTwosTurn = false;
      return;
    }

    // switch turn to player one
    this.switchPlayerTurn();
  }

  onResetGame() {
    // reset boards
    this.board1.reset();
    this.board2.reset();

    // assign first turn to player one
    this.isPlayerOnesTurn = true;
    this.isPlayerTwosTurn = false;

    // clear endgame message and flag
    this.endgameMessage = '';
    this.isGameFinished = false;
  }
}
