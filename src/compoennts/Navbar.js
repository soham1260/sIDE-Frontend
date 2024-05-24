import React,{useEffect,useContext} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { state } from './state/State'
export default function Navbar() {

  const context = useContext(state);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isLoggedIn,setIsLoggedIn } = context;
  useEffect(() => {
    if (localStorage.getItem("token")){
      setIsLoggedIn(true);
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    if (location.pathname === '/mycodes') {
      navigate('/code');
    }
  }

  const handleLogin = () => {
    if (location.pathname === '/code') {
      const confirmUpdate = window.confirm(`The code will get erased. Please copy or download the code. Click OK to proceed Login.`);
      if (confirmUpdate) {
        navigate("/login")
      }
    }
    else{
      navigate("/login")
    }
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{fontFamily: "Orbitron", marginLeft:"1%",fontSize:"larger"}}>sIDE+</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/code">Code</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${!isLoggedIn && "disabled"}`} aria-disabled={!isLoggedIn}  to="/mycodes">My codes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
              {isLoggedIn ? <div style={{cursor:"pointer"}} onClick={handleLogout}><p className='navbarlogin'>Logout</p></div> : <div style={{cursor:"pointer"}} onClick={handleLogin}><p className='navbarlogin'>Login</p></div>}
          </div>
        </div>
      </nav>
    </div>
  )
}
