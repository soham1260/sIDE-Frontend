import React, { useState,useEffect,useContext,useRef } from 'react';
import Editor from '@monaco-editor/react';
import copy from '../assets/copy.svg'
import upload from '../assets/upload.svg'
import download from '../assets/download.svg'
import reset from '../assets/reset.svg'
import cloud from '../assets/cloud.svg'
import share from '../assets/share.svg'
import spinner from '../assets/spinner.gif'
import demoprograms from '../data/demoprograms';
import languageinfo from '../data/languageinfo';
import { state } from './state/State'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import { marked } from "marked";

export default function Code() {
  const modalRef = useRef(null);
  const [code, setCode] = useState("");
  const [ans, setAns] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("c");
  const [filename, setFileName] = useState("");
  const [loading,setLoading] = useState(true);
  const [outputloading,setOutputLoading] = useState(false);
  const [saving,setSaving] = useState(false);
  const [submit,setSubmit] = useState(true);
  const [sharedCode,setSharedCode] = useState(false);
  const [generateLink,setGenerateLink] = useState(false);
  const [sharedCodeLink,setsharedCodeLink] = useState("");
  const [sharedFileName,setSharedFileName] = useState("");

  const [Prompt,setPrompt] = useState("");
  
  const [Response,setResponse] = useState("");

  const timeouts = useRef([]);

  const [Generating,setGenerating] = useState(false);

  const GeneratingRef = useRef(false);

  useEffect(() => {
    GeneratingRef.current = Generating;
  }, [Generating]);

  const context = useContext(state);
  const { isLoggedIn,setIsLoggedIn } = context;
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loadContent = async () => {

      if (location.pathname.startsWith('/code')) {
        if(id)
        {
          await fetchCode(id);
        }
        else if(localStorage.getItem("c") && localStorage.getItem("c").length !== 0)
        {
          setLanguage("c");
          setCode(localStorage.getItem("c"));
          setFileName("main");
        }
        else {
          setLanguage("c");
          setCode(demoprograms["c"]);
          setFileName("main");
        }
      }
      else if(location.pathname.startsWith('/sharedcode'))
      {
        setSharedCode(true);
        await fetchSharedCode(id);
      }
  
      if (localStorage.getItem("token")){
        setIsLoggedIn(true);
      }
    }

    loadContent();
    setLoading(false)
  }, [id]);

  useEffect(() => {
    const handleModalHidden = () => {
      setSharedFileName("");
      setGenerateLink(false);
    };

    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', handleModalHidden);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
      }
    };
  }, []);
  
  const fetchCode = async (id) => {
    try {
      const response = await fetch(`https://side-backend.onrender.com/fetchcode?id=${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      
      const data = await response.json();
      if(!response.ok){
        throw new Error("Error connecting server");
      }
      if(data.message){
        navigate("/notfound")
      }
      setLanguage(data.language);
      setCode(data.code);
      setFileName(data.filename);
    } catch (error) {
      alert("Error connecting server, please try again");
      setLanguage("c");
      setCode(demoprograms["c"]);
      setFileName("main");
    }
  }

  const fetchSharedCode = async (id) => {
    try {
      const response = await fetch(`https://side-backend.onrender.com/sharedcode/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      const data = await response.json();
      if(!response.ok){
        navigate("/notfound");
      }
      setLanguage(data.language);
      setCode(data.code);
      setFileName(data.name);
    } catch (error) {
      navigate("/notfound")
    }
  }

  const handleSubmit = async () => {
    setSubmit(false);
    setOutputLoading(true);
    try {
      const response = await fetch("https://side-backend.onrender.com/submitcode", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ code,input,language,filename })
      });

      const data = await response.json();
      if(!response.ok){
        throw new Error("Error connecting server")
      }
      setAns(data.ans)
    } catch (error) {
      console.error("Error submitting code:", error);
      alert("Error connecting server, please try again")
    }
    setOutputLoading(false);
    setSubmit(true);
  };

  
  const handleEditorChange = (value, event) => {
    setCode(value);
    localStorage.setItem(language, value);
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

  const handleCodeUpload = (event) => {
    const confirmUpdate = window.confirm(`The code will get overwritten. Please copy or download the code. Click OK to proceed.`);
    if(confirmUpdate){
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const fileNameWithExtension = selectedFile.name;
        const fileName = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.')) || fileNameWithExtension;
        setFileName(fileName);
        const reader = new FileReader();
        reader.readAsText(selectedFile);
        reader.onload = (e) => {
          const content = e.target.result;
          setCode(content);
        };
      }
      event.target.value=null;
    }
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
      case "javascript":
        ext=".js"
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

  const checkFile = async () => {

    try {
      const response = await fetch("https://side-backend.onrender.com/checkfileexists", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ language, filename })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error connecting to server");
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Error connecting to server");
    }
  }
  
  const saveFile = async() => {
    try {
      const response = await fetch("https://side-backend.onrender.com/savefile", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ language, filename, code })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error connecting to server");
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Error connecting to server");
    }
  }

  const handleCloudSave = async () => {
    setSaving(true);
    if(isLoggedIn)
      {
        try {
          const response = await checkFile()
          if(response.exists) {
            const confirmUpdate = window.confirm(`File ${filename}.${language} already exists. Do you want to update it?`);
            if (confirmUpdate) {
              await saveFile();
            }
          }
          else {
            await saveFile();
          }
        } catch (error) {
          alert("Error connecting server, please try again");
        }
      }
      setSaving(false);
  }

  function handleLanguageChange(language) {
    
      setLanguage(language);
      if(localStorage.getItem(language) && localStorage.getItem(language).length!=0){
        setCode(localStorage.getItem(language));
      }
      else{
        setCode(demoprograms[language])
      }
      setAns("");
      setFileName("main");
    
  }

  const genLink = async () => {
    setGenerateLink(true);
    let name = sharedFileName.length === 0 ? filename : sharedFileName;
    try {
      const response = await fetch("https://side-backend.onrender.com/sharecode", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code, name})
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error connecting to server");
      }
      
      setsharedCodeLink("https://side-28r4.onrender.com/sharedcode/"+data.urlid);
    } catch (error) {
      throw new Error(error.message || "Error connecting to server");
    }
  }

  const syncCode = async () => {
    try {
      const response = await fetch("https://side-backend.onrender.com/synccode", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code, id})
      });
  
      if (!response.ok) {
        navigate("/notfound");
      }
    } catch (error) {
      throw new Error(error.message || "Error connecting to server");
    }
  }
  
  const onPromptChange = (e) => {
      setPrompt(e.target.value)
    };
  
  const handlePrompt = async() => {
    setResponse("");
    setGenerating(true);
    fetch("https://side-backend.onrender.com/ai",{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        prompt: Prompt,
        ...(checked && { code: code }),
        language: language
      })
    })
    .then(res => res.json())
    .then(data => {
      if (!GeneratingRef.current) {
        // If stopped before response arrived, do nothing here
        return;
      }
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
      const fullText = marked(data.response ? data.response : "Please Enter the message!");
      for (let i = 0; i < fullText.length; i++) {
        const timeout = setTimeout(() => {
          setResponse(prev => prev + fullText.charAt(i));
        }, i * 10);
        timeouts.current.push(timeout);
      }
      const finalTimeout = setTimeout(() => {
        setGenerating(false);
      }, fullText.length * 10);
      timeouts.current.push(finalTimeout);
    });
  }

  const handleCopy = (append) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(Response, "text/html");
    const codeElement = doc.querySelector("code");

    const extracted = codeElement ? codeElement.textContent : null;

    if(append) {
      setCode(code+extracted);
    }
    else {
      setCode(extracted);
    }
  }

  return (
    <div style={{paddingTop: "1%"}}>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{backgroundColor: "#2c2c2c",color:"white",borderColor:"white"}}>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: languageinfo[language] }}/>
          </div>
        </div>
      </div>
      
      <div className="modal fade" id="AIModal" tabIndex="-1" aria-labelledby="AIModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{width:"850px", maxWidth:"90%"}}>
          <div className="modal-content" style={{backgroundColor: "#2c2c2c",color:"white",borderColor:"white"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="AIModalLabel">Need help with code? Ask right away!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <textarea
                placeholder="What does this code do?"
                className="form-control custom-textarea"
                type="text"
                name="prompt"
                value={Prompt}
                onChange={onPromptChange}
              />
              <div dangerouslySetInnerHTML={{ __html: Response }} style={{marginTop:"15px"}}/>
            </div>
            <div className="modal-footer">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={() => setChecked(!checked)} style={{transform: "scale(1.2)",marginRight:"5px"}}/>
                <label class="form-check-label" for="flexCheckDefault">
                  Include code with query
                </label>
              </div>
              <button type="button" className="btn abtn" onClick={() => {handleCopy(true)}}>
                Append to code
              </button>
              <button type="button" className="btn abtn" onClick={() => {handleCopy(false)}}>
                Overwrite on code
              </button>
              <button type="button" className="btn abtn" onClick={() => navigator.clipboard.writeText(Response)}>
                Copy
              </button>
              {Generating ? (<button
                type="button"
                className="btn sbtn"
                // data-dismiss="modal"
                onClick={() => {timeouts.current.forEach(clearTimeout);timeouts.current = [];setGenerating(false);}}
              >
                Stop
              </button>) :
              (<button type="button" className="btn abtn" onClick={handlePrompt}>
                Ask
              </button>)}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="shareFile" tabIndex="-1" aria-labelledby="shareFile" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{backgroundColor: "#2c2c2c",color:"white",borderColor:"white"}}>
            <div className="modal-body">
              <h3 style={{display:"flex",justifyContent:"center"}}>Share Code</h3>
              <h5>File Name</h5>
              <input type="text" placeholder='Enter File Name' value={sharedFileName} onChange={(e) => {setSharedFileName(e.target.value)}} style={{border: "none", border: "1px solid white",backgroundColor: "#2c2c2c", outline: "none",color:"white",width:"100%",padding:"5px",paddingLeft:"10px",fontSize: "large",borderRadius:"5px",marginBottom:"15px"}}/>
              {!generateLink ? 
                  <button type="button" className="btn btn-outline-primary" style={{marginBottom:"15px"}} onClick={genLink}>Generate Link</button>
                :
                (sharedCodeLink.length ===0 ? 
                  <img src={spinner} width={"80px"}/>
                  : <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex"}}>
                      <input type="text" disabled placeholder='Link' value={sharedCodeLink} style={{border: "none", border: "1px solid white",backgroundColor: "#2c2c2c", outline: "none",color:"white",width:"100%",padding:"5px",paddingLeft:"10px",fontSize: "large",borderRadius:"5px"}}/>
                      <img className="ico" style={{marginLeft: "15px"}} src={copy} width={"20px"} onClick={() => {navigator.clipboard.writeText(sharedCodeLink)}}/>
                    </div>
                    <div style={{paddingTop:"15px"}}>
                      The link is valid only for 24 hours. <br/><p>The link is bound to a copy of this code. Modifying the code accessible by the link won't alter this code.</p>
                    </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {loading ? <div className='spinner' style={{display: "flex", justifyContent:"center"}}><img src={spinner}/></div> :
      <div>
        <div className="row">
          <div className='d-flex col-md-8' style={{justifyContent: "space-between"}}>
            <div className='d-flex align-items-center'>
              <button type="button" className={"btn btn-outline-primary btn-sm" + (submit ? "" : " disabled")} style={{borderRadius: "0"}} onClick={handleSubmit}>Submit</button>
              <div className="dropdown" data-bs-theme="dark">
                <button className="btn btn-outline-primary btn-sm dropdown-toggle" id="dropdownMenuButtonDark" style={{borderRadius: "0",width:"100px"}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {language==="cpp" ? "c++" : language}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                  <li><a className="dropdown-item" onClick={() => {handleLanguageChange("c")}}>c</a></li>
                  <li><a className="dropdown-item" onClick={() => {handleLanguageChange("cpp")}}>c++</a></li>
                  <li><a className="dropdown-item" onClick={() => {handleLanguageChange("java");}}>Java</a></li>
                  <li><a className="dropdown-item" onClick={() => {handleLanguageChange("python")}}>Python</a></li>
                  <li><a className="dropdown-item" onClick={() => {handleLanguageChange("javascript")}}>Javascript</a></li>
                </ul>
              </div>
              <button type="button" className="btn btn-outline-primary btn-sm" style={{borderRadius: "0"}} data-bs-toggle="modal" data-bs-target="#exampleModal">ⓘ</button>
              <button type="button" className="btn btn-outline-primary btn-sm" style={{borderRadius: "0",textWrap:"nowrap"}} data-bs-toggle="modal" data-bs-target="#AIModal">
                Ask AI
              </button>
              {sharedCode && <button type="button" className="btn btn-outline-primary btn-sm" style={{borderRadius: "0"}} onClick={syncCode}>Sync</button>}
              {
                language==='java' && <input type="text" style={{border: "1px solid #0D6EFD",backgroundColor: "#2c2c2c", outline: "none",color:"white",width:"80%",fontSize: "large",paddingLeft:"1%"}} value={filename} onChange={(e) => {setFileName(e.target.value)}}/>
              }
              {
                language==='java' && <p style={{padding:"0",margin:"0",fontSize:"large",color:"white",marginLeft:"1%"}}>.java</p>
              }
            </div>
            
            <div>
              <img className="ico" style={{marginRight: "15px"}} src={reset} width={"20px"} onClick={() => {localStorage.setItem(language, "");handleLanguageChange(language)}}/>
              <img className="ico" style={{marginRight: "15px"}} src={copy} width={"20px"} onClick={() => {navigator.clipboard.writeText(code)}}/>
              <img className="ico" style={{marginRight: "13px"}} src={share} width={"23px"} data-bs-toggle="modal" data-bs-target="#shareFile"/>
              <img className="ico" style={{marginRight: "15px"}} src={download} width={"23px"} onClick={handleCodeDownload}/>
              <img className="ico" style={{marginRight: "40px"}} src={upload} width={"23px"} onClick={() => {document.getElementById('codeInput').click();}}/>
            </div>
          </div>
          <div className='col-md-4'>
            <input type="text" placeholder='save code' style={{border: "none", borderBottom: "1px solid white",backgroundColor: "#2c2c2c", outline: "none",color:"white",width:"80%",fontSize: "large"}} value={filename} onChange={(e) => {setFileName(e.target.value)}}/>
            {saving ? <img src={spinner} style={{marginLeft:"20px",width:"27px"}}/> : <img className="ico" style={{marginLeft: "20px",...(isLoggedIn ? {} : { opacity: "0.6" })}} src={cloud} width={"28px"} onClick={handleCloudSave}/>}
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
                  {outputloading ? <div style={{display: "flex", justifyContent:"center",alignItems:"center",width: '100%', height: '78%'}}><img src={spinner} width="20%" height="40%"/></div> : <textarea className='px-4' type="text" value={ans} readOnly style={{ width: '100%', height: '78%', border: '0', maxHeight:"100%",padding:"0",outline: "none",backgroundColor: "#2c2c2c",resize:"none",colorScheme:"dark"}} />}
                </div>
              </div>
            </div>
        </div>
        <input type="file" id="fileInput" style={{ display: 'none' }} accept=".txt" onChange={handleInputUpload} />
        <input type="file" id="codeInput" style={{ display: 'none' }} accept={language === "python" ? ".py" : (language === "javascript" ? ".js" : "." + language)} onChange={handleCodeUpload} />
      </div>}
    </div>
  );
}
