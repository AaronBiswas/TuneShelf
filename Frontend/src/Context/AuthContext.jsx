import React, { createContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";

// Rename this to avoid naming conflict
export const AuthContext = createContext();

// Rename the component to avoid conflict with the context
const AuthProvider = ({children}) => {
  const[authenticated,setAuthenticated]=useState(false);
  useEffect(()=>{
    const Token= Cookies.get("jwt");
    setAuthenticated(!!Token)
  },[])

  const login =(Token)=>{
    Cookies.set("jwt", Token, { path: "/", sameSite: "none", secure: true });
    setAuthenticated(true);
  }

  const logout = () => {
    Cookies.remove("jwt", { path: "/", sameSite: "none", secure: true });
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{authenticated,login,logout}}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider