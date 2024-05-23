import React from 'react'
import { createContext,useState,useEffect } from "react";
export const state = createContext();

export default function State(props) {
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    useEffect(() => {
      if (localStorage.getItem("token")){
        setIsLoggedIn(true);
      }
    }, [])

  return (
    <state.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {props.children}
    </state.Provider>
  )
}
