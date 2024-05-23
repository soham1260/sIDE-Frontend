import React,{useState,useEffect} from 'react'
import spinner from '../assets/spinner.gif'
import { useNavigate } from 'react-router-dom';
export default function Mycodes() {
    
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  
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
        else{
          navigate('/code')
        }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deletecode?id=${id}`, {
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

  const handleDownload = (code,filename,language) => {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      let ext;
      switch(language) {
        case "c":
          ext=".c"
          break;
        case "cpp":
          ext=".cpp"
          break;
        case "python":
          ext=".py"
          break;
        case "java":
          ext=".java"
          break;
        default:
          ext=".txt"
      }
      a.href = url;
      a.download = filename+ext;
      a.click();
      URL.revokeObjectURL(url);
  };

  return (
    <div>
      {
        loading ? <div className='spinner' style={{display: "flex", justifyContent:"center"}}><img src={spinner}/></div> :
        <div className='container'>
            <h1 style={{color: "white", paddingTop: "2%"}}>My Codes</h1>
            {
                data.codes.map((code) => {
                    return (
                        <div className='row' key={code._id} style={{color: "white",margin:"0",marginTop:"0", height:"12vh"}}>
                            <div className='col-md-8' style={{display: "flex", flexDirection: "row", alignItems:"center", height: "100%"}}>
                                <h5 style={{margin:"0"}}>{code.filename}.{code.language}</h5>
                            </div>
                            <div className='col-md-4' style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly",alignItems:"center", height: "100%"}}>
                                <button type="button" class="btn btn-outline-light" style={{width:"100px"}} onClick={() => {handleDownload(code.code,code.filename,code.language)}}>Download</button>
                                <button type="button" class="btn btn-outline-primary" style={{width:"100px"}} onClick={() => {navigate(`/code/${code._id}`)}}>Edit</button>
                                <button type="button" class="btn btn-outline-danger" style={{width:"100px"}} onClick={() => {handleDelete(code._id)}}>Delete</button>
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
