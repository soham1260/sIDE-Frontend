import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from './compoennts/Home';
import Navbar from './compoennts/Navbar';
import About from './compoennts/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/mycodes' element={<Home/>}/>
        <Route path='/code' element={<Home/>}/>
        <Route path='/about' element={<><Navbar/><About/></>}/>
      </Routes>
    </Router>
  );
}

export default App;
