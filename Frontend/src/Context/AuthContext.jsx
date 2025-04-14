import React, { createContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const[authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check both cookie and localStorage for the token
    const cookieToken = Cookies.get("jwt");
    const localToken = localStorage.getItem("jwt");
    
    // If either token exists, set authenticated to true
    if (cookieToken || localToken) {
      setAuthenticated(true);
      
      // If token exists in localStorage but not in cookie, set it in cookie
      if (localToken && !cookieToken) {
        Cookies.set("jwt", localToken, { path: "/", sameSite: "none", secure: true });
      }
    } else {
      setAuthenticated(false);
    }
  }, []);

  const login = (Token) => {
    // Store in both cookie and localStorage
    Cookies.set("jwt", Token, { path: "/", sameSite: "none", secure: true });
    localStorage.setItem("jwt", Token);
    setAuthenticated(true);
  }

  const logout = () => {
    // Clear from both cookie and localStorage
    Cookies.remove("jwt", { path: "/", sameSite: "none", secure: true });
    localStorage.removeItem("jwt");
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{authenticated, login, logout}}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider