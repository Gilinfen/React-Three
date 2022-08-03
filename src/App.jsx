import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Three1 from './Page/1-Three'

function App() {
  return (
    <div id="App">
      <div id="Box">
        <Routes>
          <Route path="/-1" element={<Three1 />}></Route>
        </Routes>
        <Link to="/-1">Three场景与相机</Link>
      </div>
    </div>
  )
}

export default App
