import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Three1 from './Page/1-Three'
import Three2 from './Page/2-Three'

function App() {
  return (
    <div id="App">
      <div id='left'>
        <Link to="/-1">Three场景与相机</Link>
        <Link to="/-2">Three场景与相机</Link>
      </div>
      <div id="Box">
        <Routes>
          <Route path="/-1" element={<Three1 />}></Route>
          <Route path="/-2" element={<Three2 />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
