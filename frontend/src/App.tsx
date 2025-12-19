
import './App.css'
import { Routes, Route } from "react-router";
import LandingPage from './screens/LandingPage';
import GamePage from './screens/GamePage';


function App() {
  
        return (
                <>
                <Routes>
                        <Route index element={<LandingPage />} />
                        <Route path='/game' element={<GamePage />} />
                </Routes>
               
                </> 
        )
}

export default App
