import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'

export default function Signup() {

    const [Credentials, setCredentials] = useState({name : "", email : "", password : ""});
	  const [Error, setError] = useState({ errors: [] });
	  let navigate = useNavigate();

		const handleSubmit = async (e) => {
			e.preventDefault();
			const {name , email , password } = Credentials;
			const response = await fetch(`https://side-backend.onrender.com/signup`,{method : 'POST',headers : {'Content-Type' : 'application/json'},body : JSON.stringify({name,email,password})});
			const json=await response.json();
			console.log(json);

			if(json.success)
			{
				localStorage.setItem('token',json.authtoken);
				navigate('/');
			}
			else
			{
				setError(json);
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
        <form id='loginForm' style={{padding:"30px 35px",height:"auto"}}>
            <h1 style={{fontFamily: "Orbitron"}}>sIDE+</h1>

            <h3 style={{marginTop:"5%"}}>Signup</h3>

            <label id='loginLabel' htmlFor="username" style={{marginTop:"2%"}}>Name</label>
            <input type="text" placeholder="Name" id="loginInput" name='name' onChange={onChange}/>
            {
              Error.errors && Error.errors.some(error => error.msg === "name") && <div style={{height:"7%",marginTop:"1%"}}><p className="error-message" style={{margin:"0"}}>Name must be alteast 3 characters</p></div>
            }
            
            <label id='loginLabel' htmlFor="username" style={{marginTop:"5%"}}>Email</label>
            <input type="text" placeholder="Email" id="loginInput" name='email' onChange={onChange}/>
            {
              Error.errors && Error.errors.some(error => error.msg === "exist") && <div style={{height:"7%",marginTop:"1%"}}><p className="error-message" style={{margin:"0"}}>Email already exists, please <Link to="/login" >Login</Link></p></div>
            }
            {
              Error.errors && Error.errors.some(error => error.msg === "email") && <div style={{height:"7%",marginTop:"1%"}}><p className="error-message" style={{margin:"0"}}>Email is required</p></div>
            }

            <label id='loginLabel' htmlFor="password" style={{marginTop:"5%"}}>Password</label>
            <input type="password" placeholder="Password" id="loginInput" name='password' onChange={onChange}/>
            {
              Error.errors && Error.errors.some(error => error.msg === "password") && <div style={{height:"7%",marginTop:"1%"}}><p className="error-message" style={{margin:"0"}}>Password must be alteast 5 characters</p></div>
            }
            
            <button id='loginButton' onClick={handleSubmit} style={{marginTop:"6%"}}>Sign Up</button>
            {/* <div className="social">
            <div className="go"><i className="fab fa-google"></i>  Google</div>
            <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
            </div> */}
            <div style={{display:"flex",justifyContent:"center",marginTop:"8%",fontSize:"large"}}>
              <Link to="/" style={{textDecoration:"none"}}>Continue as Guest</Link>
            </div>
            <div>

            </div>
        </form>
    </div>
  )
}
