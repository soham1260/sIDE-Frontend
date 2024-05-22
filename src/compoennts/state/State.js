import React from 'react'
import { createContext,useState } from "react";
export const state = createContext();

export default function State(props) {
    const [isLoggedIn,setIsLoggedIn] = useState(false)

  return (
    <state.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {props.children}
    </state.Provider>
  )
}
