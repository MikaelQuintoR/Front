import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register';
import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
        <h1>Hackathon IA</h1>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
