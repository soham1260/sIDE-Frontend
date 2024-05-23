import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from './compoennts/Home';
import Navbar from './compoennts/Navbar';
import About from './compoennts/About'
import Login from './compoennts/Login';
import Signup from './compoennts/Signup';
import Code from './compoennts/Code';
import Mycodes from './compoennts/Mycodes';
import State from './compoennts/state/State';

function App() {
  return (
    <Router>
      <State>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mycodes' element={<><Navbar/><Mycodes/></>}/>
          <Route path='/code' element={<><Navbar/><Code/></>}/>
          <Route path='/code/:id' element={<><Navbar/><Code/></>}/>
          <Route path='/notfound' element={<Home/>}/>
          <Route path='/about' element={<><Navbar/><About/></>}/>
          <Route path='/login' element={<><Login/></>}/>
          <Route path='/signup' element={<><Signup/></>}/>
        </Routes>
      </State>
    </Router>
  );
}

export default App;
