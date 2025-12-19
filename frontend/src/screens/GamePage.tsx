import { useEffect, useState } from "react"
import Button from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import {Chess} from "chess.js"


// TODO : move together , there's is code repetition here
export const INIT_GAME = 'init_game'
export const MOVE = 'move'
export const GAME_OVER = 'move'



const GamePage = () => {

        const socket = useSocket()
        const[chess,setChess] = useState(new Chess())
        const [board, setBoard] = useState(chess.board());
        const [started,setStarted] = useState<boolean>(false)


        useEffect(()=>{
                if(!socket){
                        return
                }

                socket.onmessage = (event) => {

                        const message = JSON.parse(event.data.toString())

                        console.log(message)

                        switch(message.type){
                                case INIT_GAME:
                                        setChess(new Chess())
                                        setBoard(chess.board())
                                        console.log("init game - game initialized")
                                        setStarted(true)
                                        break
                                case MOVE:
                                        console.log("move made")
                                        const move = message.payload
                                        chess.move(move)
                                        setBoard(chess.board())

                                        break
                                case GAME_OVER:
                                        console.log("game over")
                                        break
                        }
                }
        },[socket])

        if(!socket){
                return <div>Connecting ...</div>
        }
        return (
               <div className="max-w-6xl mx-auto">
                       <div className="mt-2">
                                <div className="flex gap-4 flex-col md:flex-row ">
                                        <div className="flex-2 w-full ">
                                                <ChessBoard board={board} socket={socket}/>
                                        </div>
                                        <div className="flex-1">
                                                {
                                                        !started && 
                                                        <Button
                                                                mText={"Play"}
                                                                pText=""
                                                                onClick={async()=>{
                                                                        socket.send(
                                                                                JSON.stringify({
                                                                                        type:INIT_GAME,
                                                                                })
                                                                        )
                                                                }}
                                                        />
                                                }
                                                {
                                                        started && <div>
                                                                <p className="text-3lx text-green-400">Game started</p>
                                                        </div>
                                                }
                                                
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default GamePage