import React, { useState,useEffect } from 'react';
import Editor from '@monaco-editor/react';
import copy from '../assets/copy.svg'
import upload from '../assets/upload.svg'
import download from '../assets/download.svg'
import reset from '../assets/reset.svg'
import cloud from '../assets/cloud.svg'
import demoprograms from '../data/demoprograms';

export default function Code() {
  const [code, setCode] = useState("");
  const [ans, setAns] = useState("");
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("c")
  const [filename, setFileName] = useState("")

  useEffect(() => {
    setLanguage("c");
    setCode(demoprograms["c"]);
    setFileName("main")
  }, [])
  

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/submitcode", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ code,input,language,filename })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setAns(data.ans)
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  
  const handleEditorChange = (value, event) => {
    setCode(value);
  };


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  

  const handleInputUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = (e) => {
        const content = e.target.result;
        setInput(content);
      };
    }
    event.target.value=null;
  };

  const handleCodeDownload = () => {
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

  const handleOutputDownload = () => {
    const blob = new Blob([ans], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{paddingTop: "1%"}}>
      <div className="row">
        <div className='d-flex col-md-8' style={{justifyContent: "space-between"}}>
          <div className='d-flex align-items-center'>
            <button type="button" class="btn btn-outline-primary btn-sm" style={{borderRadius: "0"}} onClick={handleSubmit}>Submit</button>
            <div class="dropdown" data-bs-theme="dark">
              <button class="btn btn-outline-primary btn-sm dropdown-toggle" id="dropdownMenuButtonDark" style={{borderRadius: "0",width:"100px"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {language==="cpp" ? "c++" : language}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                <li><a class="dropdown-item" onClick={() => {setLanguage("c");setCode(demoprograms["c"]);setAns("");}}>c</a></li>
                <li><a class="dropdown-item" onClick={() => {setLanguage("cpp");setCode(demoprograms["cpp"]);setAns("");}}>c++</a></li>
                <li><a class="dropdown-item" onClick={() => {setLanguage("java");setCode(demoprograms["java"]);setAns("");setFileName("main");}}>Java</a></li>
                <li><a class="dropdown-item" onClick={() => {setLanguage("python");setCode(demoprograms["python"]);setAns("");}}>Python</a></li>
              </ul>
            </div>
            {
              language==='java' && <input type="text" style={{border: "1px solid #0D6EFD",backgroundColor: "#2c2c2c", outline: "none",color:"white",width:"80%",fontSize: "large",paddingLeft:"1%"}} value={filename} onChange={(e) => {setFileName(e.target.value)}}/>
            }
            {
              language==='java' && <p style={{padding:"0",margin:"0",fontSize:"large",color:"white",marginLeft:"1%"}}>.java</p>
            }
          </div>
          
          <div>
            <img className="ico" style={{marginRight: "20px"}} src={reset} width={"20px"} onClick={() => {setCode(demoprograms[language])}}/>
            <img className="ico" style={{marginRight: "20px"}} src={copy} width={"20px"} onClick={() => {navigator.clipboard.writeText(code)}}/>
            <img className="ico" style={{marginRight: "40px"}} src={download} width={"23px"} onClick={handleCodeDownload}/>
          </div>
        </div>
        <div className='col-md-4'>
          <input type="text" placeholder='save code' style={{border: "none", borderBottom: "1px solid white",backgroundColor: "#2c2c2c", outline: "none",color:"white",width:"80%",fontSize: "large"}} value={filename} onChange={(e) => {setFileName(e.target.value)}}/>
          <img className="ico" style={{marginLeft: "20px"}} src={cloud} width={"30px"}/>
        </div>
      </div>
      <div className="row" style={{height: "80vh"}}>
          <div className="col-md-8" style={{padding: "0"}}>
            
            <div>
              <Editor 
                width="97%"
                height="83vh"
                language={language} 
                defaultValue={""}
                value={code} 
                onChange={handleEditorChange}
                theme='vs-dark'
                options={{
                  minimap: {
                    enabled: false,
                  },
                }

                }
              />
            </div>
          </div>

          <div className="col-md-4" style={{height: "83vh", paddingRight: "3%",paddingLeft:"0"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%"}}>

              <div className="row" style={{ height: '47%',border:'solid white 1px',borderRadius: "20px" }}>
                <div style={{color:"white",backgroundColor:"#3d3d3d",borderRadius: "20px 20px 0px 0px",display:"flex",justifyContent:"space-between"}}>
                  <h6 style={{paddingTop: "3%",paddingLeft:"2%", margin: "0"}}>Input</h6>
                  <div style={{paddingTop:"2%",width:"60px"}}>
                    <img className='ico' src={copy} style={{width: "12px"}} onClick={() => {navigator.clipboard.writeText(input)}}/>
                    <img className='ico' src={upload} style={{width: "15px",marginLeft: "30%"}} onClick={() => {document.getElementById('fileInput').click();}}/>
                  </div>
                </div>
                <textarea className='px-4' type="text" style={{ width: '100%', height: '78%', border: '0', maxHeight:"100%",padding:"0",outline: "none",backgroundColor: "#2c2c2c",resize:"none",colorScheme:"dark"}} value={input} onChange={handleInputChange}/>
              </div>

              <div className="row" style={{ height: '47%',border:'solid white 1px',borderRadius: "20px" }}>
                <div style={{color:"white",backgroundColor:"#3d3d3d",borderRadius: "20px 20px 0px 0px",display:"flex",justifyContent:"space-between"}}>
                  <h6 style={{paddingTop: "3%",paddingLeft:"2%", margin: "0"}}>Output</h6>
                  <div style={{paddingTop:"2%",width:"60px"}}>
                    <img className='ico' src={copy} style={{width: "12px"}} onClick={() => {navigator.clipboard.writeText(ans)}}/>
                    <img className='ico' src={download} style={{width: "15px",marginLeft: "30%"}} onClick={handleOutputDownload}/>
                  </div>
                </div>
                <textarea className='px-4' type="text" value={ans} style={{ width: '100%', height: '78%', border: '0', maxHeight:"100%",padding:"0",outline: "none",backgroundColor: "#2c2c2c",resize:"none",colorScheme:"dark"}} />
              </div>
            </div>
          </div>
      </div>
      <input type="file" id="fileInput" style={{ display: 'none' }} accept=".txt" onChange={handleInputUpload} />
    </div>
  );
}
