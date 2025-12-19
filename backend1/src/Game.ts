import  { Chess } from "chess.js";
import type WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages.js";


export class Game{

        public player1:WebSocket
        public player2:WebSocket
        // private board:string; //
        // private moves: string[];
        public board:Chess;
        private startTime:Date;
        private movesCount:number
        // private endTime:Date;
        // private winner:WebSocket;
        // private state:string;


        constructor(player1:WebSocket, player2:WebSocket){
                this.player1 = player1;
                this.player2 = player2;
                // this.board = ""
                // this.moves = [];
                this.board = new Chess();
                this.startTime = new Date();
                this.movesCount = 0

                // we should let them both that game has started

                this.player1.send(
                        JSON.stringify({
                                type:INIT_GAME,
                                payload:{
                                        color:"white"
                                }
                        })
                )

                this.player2.send(
                        JSON.stringify({
                                type:INIT_GAME,
                                payload:{
                                        color:"black"
                                }
                        })
                )
        }

        makeMove(socket:WebSocket,move:{from:string,to:string}){

                // validate the type of move

                if(this.movesCount %2 === 0 && socket !== this.player1){
                        return
                }

                if(this.movesCount%2 === 1 && socket !== this.player2){
                        return
                }

                try {
                        this.board.move(move);
                } catch (error) {
                        console.log(`error ${error}`);
                        return
                }

                // we save the move to DB  - for recovery purposes
                // await db.moves.push(move)

                // check is game over

                if(this.board.isGameOver()){
                        // send this game to the both player
                        this.player1.send(
                                JSON.stringify({
                                        type:GAME_OVER,
                                        payload:{
                                                winner:this.board.turn() === "w" ? "white":"black"
                                        }
                                })
                        )

                        this.player2.send(
                                JSON.stringify({
                                        type:GAME_OVER,
                                        payload:{
                                                winner:this.board.turn() === "w" ? "white":"black"
                                        }
                                })
                        )
                        return
                }

                // Game is not over - send both new board

             
                this.player2.send(
                                JSON.stringify({
                                        type:MOVE,
                                        payload:move
                                })
                        )
     
                this.player1.send(
                                JSON.stringify({
                                        type:MOVE,
                                        payload:move
                                })
                        )
             

                this.movesCount++

        }
}