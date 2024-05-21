import React from 'react'
import html from '../assets/html.png';
import css from '../assets/css.png';
import js from '../assets/js.png';
import node from '../assets/node.png';
import mongo from '../assets/mongo.png';
import express from '../assets/express.png';
import docker from '../assets/docker.png';
import react from '../assets/react.png';

export default function About() {
  return (
    <div className='container' style={{ paddingTop: "1%", paddingBottom: "5%" }}>
      <h1 style={{color: "white"}}>About</h1>
      <p style={{paddingTop: "0px", margin: "0px", color: "white"}}>From a coder, for a coder. Hi, I am Soham, the creator of this awesome website.</p>
      <p style={{paddingTop: "10px", margin: "0px", color: "white"}}>Here's the source code!</p>
      <p style={{paddingTop: "10px", margin: "0px", color: "white"}}><a href="https://github.com/soham1260/sIDE-Frontend">Frontend</a> | <a href="https://github.com/soham1260/sIDE-backend">Backend</a></p>
      <p style={{paddingTop: "10px", margin: "0px", color: "white"}}>The major components that helped me build this awesome website,</p>
      <div className="row" style={{width : '100%', paddingBottom: "3%"}}>

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-10">HTML (Hypertext Markup Language) is the standard markup language used to create web pages. It defines the structure and content of a web page using a system of tags and attributes.</div>
          <div class="col-md-2"><img src={html} alt="html" width="100px"/></div>
        </div>

          <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px"}} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-2"><img src={css} alt="html" width="100px"/></div>
          <div class="col-md-10">CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML or XML (including XML dialects such as SVG or XHTML).</div>
        </div>

          <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px" }} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-10">JavaScript is a versatile programming language commonly used for web development, but also increasingly popular for server-side and mobile application development.</div>
          <div class="col-md-2"><img src={js} alt="html" width="100px"/></div>
        </div>

          <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px" }} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-2"><img src={node} alt="html" width="150px"/></div>
          <div class="col-md-10">Node.js is an open-source, server-side JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript code outside of a web browser, enabling server-side scripting to build scalable web applications and APIs.</div>
        </div>

          <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px" }} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-10">MongoDB is a popular open-source, NoSQL database management system designed for modern application development.MongoDB is a document-oriented database, which means it stores data in flexible, JSON-like documents. Each document can have its own structure, and fields can vary from one document to another.</div>
          <div class="col-md-2"><img src={mongo} alt="html" width="100px"/></div>
        </div>

          <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px" }} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-2"><img src={express} alt="html" width="150px"/></div>
          <div class="col-md-10">Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It is designed to make it easy to build single-page, multi-page, and hybrid web applications.</div>
        </div>

          <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px" }} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-10">React.js is a popular open-source JavaScript library for building user interfaces, developed and maintained by Meta(formerly Facebook). React.js provides a powerful and efficient way to build modern, interactive user interfaces for web and mobile applications, emphasizing performance, scalability, and developer experience.</div>
          <div class="col-md-2"><img src={react} alt="html" width="100px"/></div>
        </div>

        <hr style={{ width: "100%", height: "2px", backgroundColor: "#00aeefcc", margin: "0px" , border: "0px" }} />

        <div style={{height: "120px", display: "flex", alignItems: "center", color: "white" }}>
          <div class="col-md-2"><img src={docker} alt="html" width="120px"/></div>
          <div class="col-md-10">Docker is an open-source containerization platform by which you can pack your application and all its dependencies into a standardized unit called a container. Containers are light in weight which makes them portable and they are isolated from the underlying infrastructure and from each other container.</div>
        </div>

      </div>
    </div>
  )
}
