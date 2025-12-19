import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";
export class Game {
    player1;
    player2;
    // private board:string; //
    // private moves: string[];
    board;
    startTime;
    movesCount;
    // private endTime:Date;
    // private winner:WebSocket;
    // private state:string;
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        // this.board = ""
        // this.moves = [];
        this.board = new Chess();
        this.startTime = new Date();
        this.movesCount = 0;
        // we should let them both that game has started
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // validate the type of move
        if (this.movesCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.movesCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(`error ${error}`);
            return;
        }
        // check is game over
        if (this.board.isGameOver()) {
            // send this game to the both player
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "white" : "black"
                }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "white" : "black"
                }
            }));
            return;
        }
        // Game is not over - send both new board
        this.player2.send(JSON.stringify({
            type: MOVE,
            payload: move
        }));
        this.player1.send(JSON.stringify({
            type: MOVE,
            payload: move
        }));
        this.movesCount++;
    }
}
//# sourceMappingURL=Game.js.map