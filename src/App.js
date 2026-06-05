import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './compoennts/Home';
import Navbar from './compoennts/Navbar';
import About from './compoennts/About'
import Login from './compoennts/Login';
import Signup from './compoennts/Signup';
import Code from './compoennts/Code';
import Mycodes from './compoennts/Mycodes';
import History from './compoennts/History';
import State from './compoennts/state/State';
import Notfound from './compoennts/Notfound';

function App() {
  return (
    <Router>
      <State>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mycodes' element={<><Navbar/><Mycodes/></>}/>
          <Route path='/history' element={<><Navbar/><History/></>}/>
          <Route path='/code' element={<><Navbar/><Code/></>}/>
          <Route path='/code/:id' element={<><Navbar/><Code/></>}/>
          <Route path='/sharedcode/:id' element={<><Navbar/><Code/></>}/>
          <Route path='/notfound' element={<><Navbar/><Notfound/></>}/>
          <Route path='/about' element={<><Navbar/><About/></>}/>
          <Route path='/login' element={<><Login/></>}/>
          <Route path='/signup' element={<><Signup/></>}/>
          <Route path='*' element={<><Navbar/><Notfound/></>}/>
        </Routes>
      </State>
    </Router>
  );
}

export default App;
