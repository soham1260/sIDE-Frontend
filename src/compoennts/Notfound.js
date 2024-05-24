import React from 'react'
import notfound from '../assets/404.png'
export default function Notfound() {
  return (
    <div className='container' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <img src={notfound} width="600px"/>
    </div>
  )
}
