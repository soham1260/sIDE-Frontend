import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div>
        <Navbar/>
        <div className='container' style={{color: "white"}}>
          <div style={{display:"flex",justifyContent:"center"}}><p style={{color:"white",fontSize:"100px",fontFamily:"Orbitron"}}>sIDE+</p></div>
          <p ><b>sIDE+</b> is your one-stop online IDE for coding in <b>C</b>, <b>C++</b>, <b>Java</b>, <b>Python</b>, and <b>Javascript</b>. Whether you’re a beginner learning to code, or a professional polishing your skills, sIDE+ is designed to make your coding experience seamless and efficient.</p>
          <p style={{marginBottom:"5px"}}><b>Why use sIDE+ ?</b></p>
          <ul>
            <li><b>Compile & Execute:</b> Run your code in real-time with our powerful compiler for multiple languages.</li>
            <li><b>React Monaco Editor:</b> The same editor that powers popular IDE VSCode, offering syntax highlighting, autocompletion, and error checking.</li>
            <li><b>Cloud Storage:</b> Save your projects in the cloud for easy access anytime, anywhere.</li>
            <li><b>Auto-save:</b> Saves your latest code automatically.</li>
            <li><b>Code Management:</b> Download and upload your code with ease, keeping your work organized and portable.</li>
          </ul>
          Join the community of developers who are already coding smarter, not harder. <b>Start your journey with sIDE+ today! Headover to the <Link to="/code" style={{textDecoration:"none"}}>code</Link> section.</b>
        </div>
    </div>
  )
}
