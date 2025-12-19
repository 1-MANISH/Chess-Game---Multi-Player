import { useNavigate } from "react-router"
import Button from "../components/Button"


const LandingPage = () => {

        const navigate = useNavigate()
        return (
                <div className="max-w-6xl mx-auto">
                       <div className="mt-2">

                                <div className="flex gap-4 flex-col md:flex-row">

                                        <div className="p-4">
                                                <img 
                                                src={"./chess-board.avif"} 
                                                alt="chess-board" 
                                                className="max-w-120"
                                                />
                                        </div>

                                        <div className="p-4">
                                                <h1 className="text-7xl font-bold">Play Chess Online</h1>
                                                <p className="text-xl mt-2">
                                                        Play chess online with your friends
                                                </p>
                                                <div className="mt-4 ">
                                                        <Button 
                                                                mText={"Play Online"}
                                                                pText={"Play with your friends at your level"}
                                                                onClick={async()=> navigate("/game")}
                                                        />
                                                </div>
                                        </div>
                                </div>

                       </div>
                </div>
        )
}

export default LandingPage