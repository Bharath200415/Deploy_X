import './App.css'
import { Landing } from './components/landing'
import DeployXLanding from './components/landingmain'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DeployXLanding />} />
        <Route path="/deploy" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App