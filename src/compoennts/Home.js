import React from 'react'
import Navbar from './Navbar'
export default function Home() {
  return (
    <div>
        <Navbar/>
        <div className='container' style={{color: "white"}}>
          <div style={{display:"flex",justifyContent:"center"}}><p style={{color:"white",fontSize:"100px",fontFamily:"Orbitron"}}>sIDE+</p></div>
          <p ><b>sIDE+</b> is your one-stop online IDE for coding in <b>C</b>, <b>C++</b>, <b>Java</b>, and <b>Python</b>. Whether you’re a student learning to code, a professional polishing your skills, or a hobbyist working on a passion project, sIDE+ is designed to make your coding experience seamless and efficient.</p>
          <p style={{marginBottom:"5px"}}><b>Features at a Glance:</b></p>
          <ul>
            <li><b>Compile & Execute:</b> Run your code in real-time with our powerful compiler for multiple languages.</li>
            <li><b>Cloud Storage:</b> Save your projects in the cloud for easy access anytime, anywhere.</li>
            <li><b>Code Management:</b> Download and upload your code with ease, keeping your work organized and portable.</li>
          </ul>
          Join the community of developers who are already coding smarter, not harder. <b>Start your journey with sIDE+ today! Headover to the code section.</b>
        </div>
    </div>
  )
}
