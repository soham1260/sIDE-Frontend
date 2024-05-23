import React,{useState,useEffect} from 'react'
import spinner from '../assets/spinner.gif'
export default function Mycodes() {
    
  const [loading,setLoading] = useState(true);

  
  const [data,setData] = useState({})

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/fetchuserdata", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      const data = await response.json();
      if(!response.ok){
        throw new Error("Error connecting server")
      }
      setData(data);
    } catch (error) {
      console.error("Error submitting code:", error);
      alert("Error connecting server, please try again")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        if (localStorage.getItem("token")) {
            setLoading(true);
            await fetchUserData();
            console.log(data);
            setLoading(false);
        }
    };

    fetchData();
}, []);

  return (
    <div>
      {
        loading ? <div className='spinner' style={{display: "flex", justifyContent:"center"}}><img src={spinner}/></div> :
        <div className='container'>
            <h1 style={{color: "white", paddingTop: "1%", paddingBottom: "1%"}}>My Codes</h1>
            {
                data.codes.map((code) => {
                    return (
                        <div className='row' style={{color: "white",margin:"0",marginTop:"0", height:"12vh"}}>
                            <div className='col-md-10' style={{display: "flex", flexDirection: "row", alignItems:"center", height: "100%"}}>
                                <h5 style={{margin:"0"}}>{code.filename}.{code.language}</h5>
                            </div>
                            <div className='col-md-2' style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly",alignItems:"center", height: "100%"}}>
                                <button type="button" class="btn btn-outline-primary">Edit</button>
                                <button type="button" class="btn btn-outline-danger">Delete</button>
                            </div>
                            <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px"}} />
                        </div>
                    );
                })
            }
        </div>
      }
    </div>
  )
}
