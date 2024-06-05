import React,{useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'
import { state } from './state/State'

export default function Login() {

  const [Credentials, setCredentials] = useState({email : "",password : ""});
  const [Error, setError] = useState(false);
  let navigate = useNavigate();

  const context = useContext(state);
  const { setIsLoggedIn } = context;

  const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(Credentials);
      const response = await fetch(`http://localhost:5000/login`,{method : 'POST',headers : {'Content-Type' : 'application/json'},body : JSON.stringify({email : Credentials.email,password : Credentials.password})});
      const json=await response.json();
      console.log(json);

      if(json.success)
      {
        localStorage.setItem('token', json.authtoken);
        setIsLoggedIn(true);
        navigate('/');
      }
      else
      {
        setError(true);
      }
  }

  const onChange = (e) => {
      setCredentials({...Credentials,[e.target.name] : e.target.value})
  }

  return (
    <div>
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form id='loginForm' style={{height:"auto"}}>
            <h1 style={{fontFamily: "Orbitron"}}>sIDE+</h1>

            <h3>Login</h3>
            <label id='loginLabel' htmlFor="username" style={{marginTop:"10px"}}>Email</label>
            <input type="text" placeholder="Email" id="loginInput" name='email' onChange={onChange}/>

            <label id='loginLabel' htmlFor="password" style={{marginTop:"10px"}}>Password</label>
            <input type="password" placeholder="Password" id="loginInput" name='password' onChange={onChange}/>
            {
              Error && <div style={{height:"10%",display:"flex", alignItems:"center",marginTop:"2%"}}><p className="error-message" style={{margin:"0"}}>Invalid Email or Password</p></div>
            }
            
            <button id='loginButton' onClick={handleSubmit}>Log In</button>
            {/* <div className="social">
            <div className="go"><i className="fab fa-google"></i>  Google</div>
            <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
            </div> */}
            <div style={{display:"flex",justifyContent:"center",marginTop:"8%",fontSize:"large"}}>
              <Link to="/signup" style={{textDecoration:"none"}}>New Coders, Signup</Link>
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"5%",fontSize:"large"}}>
              <Link to="/" style={{textDecoration:"none"}}>Continue as Guest</Link>
            </div>
            <div>

            </div>
        </form>
    </div>
  )
}
