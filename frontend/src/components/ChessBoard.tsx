import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/GamePage";


const ChessBoard = ({board,socket}:{board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
        } | null)[][];
        socket:WebSocket
}) => {

        const [from,setFrom] = useState<null | Square>(null)
        const[to,setTo] = useState<null | Square>(null)




        return (
                <div className="text-2xl w-full ">

                        {
                                board.map((row,rowIndex)=>{
                                        return (
                                                <div className="flex w-full" key={rowIndex}>
                                                        {
                                                                row.map((square,squareIndex)=>{

                                                                        const squareRepresentation =String.fromCharCode(97+(squareIndex%8))+""+(8-Math.floor(rowIndex%8) ) as Square
                                                                        return (
                                                                                <div 
                                                                                className={`w-20 h-20 flex items-center justify-center ${(rowIndex+squareIndex)%2==0 ? 'bg-green-700' : 'bg-gray-300'}`}
                                                                                key={squareIndex}
                                                                                onClick={(e)=>{
                                                                                        
                                                                                        e.stopPropagation()
                                                                                       
                                                                                        if(!from){
                                                                                                setFrom(_prev=> squareRepresentation)
                                                                                        } else{
                                                                                                try {
                                                                                                        setTo(_prev=>squareRepresentation)
                                                                                                        
                                                                                                        
                                                                                                        socket.send(
                                                                                                                JSON.stringify({
                                                                                                                        type:MOVE,
                                                                                                                        payload:{
                                                                                                                                from:from,
                                                                                                                                to:squareRepresentation
                                                                                                                        }
                                                                                                                })
                                                                                                        )
                                                                                                        console.log({from,to:squareRepresentation})
                                                                                                        setFrom(null)
                                                                                                        setTo(null)
                                                                                                } catch (error) {
                                                                                                        
                                                                                                }
                                                                                        }
                                                                                }}
                                                                                >
                                                                                       <div className="h-full  flex items-center justify-center">
                                                                                         {/* {square ? square?.type : ""} */}

                                                                                         {
                                                                                                square ?
                                                                                                <img 
                                                                                                className="w-4 cursor-pointer"
                                                                                                src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png `}
                                                                                                />
                                                                                                 :null
                                                                                         }
                                                                                       </div>
                                                                                </div>
                                                                        )
                                                                })
                                                        }
                                                </div>
                                        )
                                })
                        }
   
                </div>
        )
}

export default ChessBoard