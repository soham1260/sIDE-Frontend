import React, { useState, useEffect } from 'react'
import spinner from '../assets/spinner.gif'
import { useNavigate } from 'react-router-dom';

export default function History() {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [data, setData] = useState()

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "fetchuserexecutionhistory", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error connecting server")
      }
      setData(data);
    } catch (error) {
      console.error("Error submitting code:", error);
      localStorage.clear();
      alert("Error connecting server, please try again")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        setLoading(true);
        await fetchHistoryData();
        console.log(data);
        setLoading(false);
      }
      else {
        navigate('/code')
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + `deleteexecutionhistory?id=${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Error connecting server")
      }
      setData(data);
    } catch (error) {
      console.error("Error deleting history:", error);
      alert("Error connecting server, please try again")
    }
  }

  const handleDownload = async (id, filename, language) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "fetchcode?id=" + id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      const data = await response.json();
      if (!response.ok || data.message) {
        throw new Error(data.message || "Error fetching code");
      }

      const blob = new Blob([data.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      let ext;
      switch (language) {
        case "c":
          ext = ".c"
          break;
        case "cpp":
          ext = ".cpp"
          break;
        case "python":
          ext = ".py"
          break;
        case "java":
          ext = ".java"
          break;
        case "javascript":
          ext = ".js"
          break;
        default:
          ext = ".txt"
      }
      a.href = url;
      a.download = filename + ext;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading code:", error);
      alert("Error downloading code, please try again")
    }
  };

  return (
    <div>
      {
        loading ? <div className='spinner' style={{ display: "flex", justifyContent: "center" }}><img src={spinner} /></div> :
          <div className='container'>
            <h1 style={{ color: "white", paddingTop: "2%" }}>Execution History</h1>
            {
              data && data.execution_history && data.execution_history.length > 0 ? (
                data.execution_history.map((code) => {
                  return (
                    <div className='row' key={code._id} style={{ color: "white", margin: "0", marginTop: "0", height: "12vh" }}>
                      <div className='col-md-8' style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "100%" }}>
                        <h5 style={{ margin: "0" }}>{code.filename || "main"}.{code.language === "python" ? "py" : (code.language === "javascript" ? "js" : code.language)}</h5>
                      </div>
                      <div className='col-md-4' style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", height: "100%" }}>
                        <button type="button" className="btn btn-outline-light" style={{ width: "100px" }} onClick={() => { handleDownload(code._id, code.filename || "main", code.language) }}>Download</button>
                        <button type="button" className="btn btn-outline-primary" style={{ width: "100px" }} onClick={() => { navigate(`/history/${code._id}`) }}>View</button>
                        <button type="button" className="btn btn-outline-danger" style={{ width: "100px" }} onClick={() => { handleDelete(code._id) }}>Delete</button>
                      </div>
                      <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px", border: "0px" }} />
                    </div>
                  );
                })
              ) : (
                <div style={{ color: "white", marginTop: "5%", textAlign: "center" }}>
                  <h3>No execution history found</h3>
                </div>
              )
            }
          </div>
      }
    </div>
  )
}
