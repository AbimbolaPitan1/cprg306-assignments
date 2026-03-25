"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithRedirect,   
  getRedirectResult,    
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  
  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    return signInWithRedirect(auth, provider);
  };

  const firebaseSignOut = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

   
    getRedirectResult(auth).catch((error) => {
      console.error("Redirect error:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};